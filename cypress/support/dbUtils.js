const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

/**
 * Database utility for direct PostgreSQL access in Cypress tests
 * This bypasses RLS and allows direct database queries for testing
 */
class DatabaseUtils {
  constructor() {
    this.client = null;
  }

  /**
   * Initialize database connection
   * @param {Object} config - Database configuration
   */
  async connect(config = {}) {
    let sslConfig = false;

    // Check if SSL is explicitly disabled via config or environment
    const sslEnabled = config.ssl !== false && process.env.SUPABASE_DB_SSL !== 'false';

    if (sslEnabled) {
      // Use custom CA if available
      try {
        const certPath = path.join(__dirname, '../../certs/prod-ca-2021.crt');
        if (fs.existsSync(certPath)) {
          const ca = fs.readFileSync(certPath).toString();
          sslConfig = { ca, rejectUnauthorized: true };
          console.log('🔐 Using custom SSL certificate');
        } else {
          // Fallback if cert not found
          sslConfig = { rejectUnauthorized: false };
          console.log('🔐 Using SSL without custom certificate (rejectUnauthorized: false)');
        }
      } catch (e) {
        // Fallback if cert not found
        sslConfig = { rejectUnauthorized: false };
        console.log('🔐 Using SSL without custom certificate (rejectUnauthorized: false)');
      }
    } else {
      console.log('🔐 SSL disabled via configuration');
    }

    const dbConfig = {
      host: config.host || process.env.SUPABASE_DB_HOST,
      port: config.port || process.env.SUPABASE_DB_PORT || 5432,
      database: config.database || process.env.SUPABASE_DB_NAME,
      user: config.user || process.env.SUPABASE_DB_USER,
      password: config.password || process.env.SUPABASE_DB_PASSWORD,
      ssl: sslConfig,
    };

    // Validate required credentials
    if (!dbConfig.host || !dbConfig.database || !dbConfig.user || !dbConfig.password) {
      throw new Error('Database credentials are required. Please set SUPABASE_DB_HOST, SUPABASE_DB_NAME, SUPABASE_DB_USER, and SUPABASE_DB_PASSWORD in your .env file.');
    }

    console.log('🔌 Attempting to connect to database...');
    console.log('📍 Host:', dbConfig.host);
    console.log('🚪 Port:', dbConfig.port);
    console.log('🗄️  Database:', dbConfig.database);
    console.log('👤 User:', dbConfig.user);
    console.log('🔐 SSL:', sslConfig ? 'Enabled' : 'Disabled');

    this.client = new Client(dbConfig);
    await this.client.connect();
    console.log('✅ Connected to database successfully');
  }

  /**
   * Execute a query
   * @param {string} query - SQL query
   * @param {Array} params - Query parameters
   * @returns {Promise<Object>} Query result
   */
  async query(query, params = []) {
    if (!this.client) {
      throw new Error('Database not connected. Call connect() first.');
    }

    try {
      const result = await this.client.query(query, params);
      return result;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  /**
   * Find organization by name
   * @param {string} orgName - Organization name
   * @returns {Promise<Object|null>} Organization data or null
   */
  async findOrganizationByName(orgName) {
    const query = `
      SELECT id, name, created_at, updated_at
      FROM organizations 
      WHERE name = $1
    `;

    const result = await this.query(query, [orgName]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  /**
   * Find profile by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} Profile data or null
   */
  async findProfileByEmail(email) {
    const query = `
      SELECT id, email, first_name, last_name, organization_id, role, created_at, updated_at
      FROM profiles 
      WHERE email = $1
    `;

    const result = await this.query(query, [email]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  /**
   * Find profile by user ID
   * @param {string} userId - User ID
   * @returns {Promise<Object|null>} Profile data or null
   */
  async findProfileById(userId) {
    const query = `
      SELECT id, email, first_name, last_name, organization_id, role, created_at, updated_at
      FROM profiles 
      WHERE id = $1
    `;

    const result = await this.query(query, [userId]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  /**
   * Get organization with all its profiles
   * @param {string} orgName - Organization name
   * @returns {Promise<Object|null>} Organization with profiles
   */
  async getOrganizationWithProfiles(orgName) {
    const query = `
      SELECT 
        o.id as org_id,
        o.name as org_name,
        o.created_at as org_created_at,
        o.updated_at as org_updated_at,
        p.id as profile_id,
        p.email,
        p.first_name,
        p.last_name,
        p.role,
        p.created_at as profile_created_at
      FROM organizations o
      LEFT JOIN profiles p ON o.id = p.organization_id
      WHERE o.name = $1
      ORDER BY p.created_at
    `;

    const result = await this.query(query, [orgName]);
    return result.rows;
  }

  /**
   * Count records in a table
   * @param {string} tableName - Table name
   * @param {Object} whereClause - Optional where conditions
   * @returns {Promise<number>} Record count
   */
  async countRecords(tableName, whereClause = {}) {
    let query = `SELECT COUNT(*) FROM ${tableName}`;
    const params = [];
    let paramIndex = 1;

    if (Object.keys(whereClause).length > 0) {
      const conditions = [];
      for (const [key, value] of Object.entries(whereClause)) {
        conditions.push(`${key} = $${paramIndex}`);
        params.push(value);
        paramIndex++;
      }
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    const result = await this.query(query, params);
    return parseInt(result.rows[0].count);
  }

  /**
   * Find lead by email
   * @param {string} email - Lead email
   * @returns {Promise<Object|null>} Lead data or null
   */
  async findLeadByEmail(email) {
    const query = `
      SELECT id, first_name, last_name, email, company, phone, status, created_at, updated_at
      FROM leads 
      WHERE email = $1
    `;

    const result = await this.query(query, [email]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  /**
   * Delete lead by email
   * @param {string} email - Lead email
   * @returns {Promise<Object>} Deletion result
   */
  async deleteLeadByEmail(email) {
    console.log(`🗑️  Deleting lead with email: ${email}`);

    // First, find the lead to get its details
    const lead = await this.findLeadByEmail(email);

    if (lead) {
      // Delete the lead
      const result = await this.query('DELETE FROM leads WHERE email = $1 RETURNING *', [email]);

      console.log(`✅ Lead deleted:`, result.rows[0]);
      return { deleted: true, lead: result.rows[0] };
    } else {
      console.log(`❌ No lead found to delete: ${email}`);
      return { deleted: false, lead: null };
    }
  }

  async deleteLeadsByIds(ids = []) {
    if (!Array.isArray(ids) || ids.length === 0) {
      console.log('⚠️ deleteLeadsByIds called with empty ids array');
      return { deleted: 0, leads: [] };
    }

    const query = 'DELETE FROM leads WHERE id = ANY($1::uuid[]) RETURNING id, first_name, last_name, email';
    const result = await this.query(query, [ids]);
    console.log(`🗑️  Deleted ${result.rows.length} leads by IDs`);
    return { deleted: result.rows.length, leads: result.rows };
  }

  /**
   * Find customer by email
   * @param {string} email - Customer email
   * @returns {Promise<Object|null>} Customer data or null
   */
  async findCustomerByEmail(email) {
    const query = `
      SELECT id, first_name, last_name, email, company, position, phone, mobile, website, status, created_at, updated_at
      FROM customers 
      WHERE email = $1
    `;

    const result = await this.query(query, [email]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  /**
   * Delete customer by email
   * @param {string} email - Customer email
   * @returns {Promise<Object>} Deletion result
   */
  async deleteCustomerByEmail(email) {
    console.log(`🗑️  Deleting customer with email: ${email}`);

    // First, find the customer to get its details
    const customer = await this.findCustomerByEmail(email);

    if (customer) {
      // Delete the customer
      const result = await this.query('DELETE FROM customers WHERE email = $1 RETURNING *', [email]);

      console.log(`✅ Customer deleted:`, result.rows[0]);
      return { deleted: true, customer: result.rows[0] };
    } else {
      console.log(`❌ No customer found to delete: ${email}`);
      return { deleted: false, customer: null };
    }
  }

  async deleteCustomersByIds(ids = []) {
    if (!Array.isArray(ids) || ids.length === 0) {
      console.log('⚠️ deleteCustomersByIds called with empty ids array');
      return { deleted: 0, customers: [] };
    }

    const query = 'DELETE FROM customers WHERE id = ANY($1::uuid[]) RETURNING id, first_name, last_name, email';
    const result = await this.query(query, [ids]);
    console.log(`🗑️  Deleted ${result.rows.length} customers by IDs`);
    return { deleted: result.rows.length, customers: result.rows };
  }

  /**
   * Find sale by invoice number
   * @param {string} invoiceNumber - Sale invoice number
   * @returns {Promise<Object|null>} Sale data or null
   */
  async findSaleByInvoiceNumber(invoiceNumber) {
    const query = `
      SELECT id, customer_id, amount, description, sale_date, payment_status, payment_method, invoice_number, organization_id, profile_id, created_at, updated_at
      FROM sales 
      WHERE invoice_number = $1
    `;

    const result = await this.query(query, [invoiceNumber]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  /**
   * Delete sale by invoice number
   * @param {string} invoiceNumber - Sale invoice number
   * @returns {Promise<Object>} Deletion result
   */
  async deleteSaleByInvoiceNumber(invoiceNumber) {
    console.log(`🗑️  Deleting sale with invoice number: ${invoiceNumber}`);

    // First, find the sale to get its details
    const sale = await this.findSaleByInvoiceNumber(invoiceNumber);

    if (sale) {
      // Delete the sale
      const result = await this.query('DELETE FROM sales WHERE invoice_number = $1 RETURNING *', [invoiceNumber]);

      console.log(`✅ Sale deleted:`, result.rows[0]);
      return { deleted: true, sale: result.rows[0] };
    } else {
      console.log(`❌ No sale found to delete: ${invoiceNumber}`);
      return { deleted: false, sale: null };
    }
  }

  /**
   * Find task by title
   * @param {string} title - Task title
   * @returns {Promise<Object|null>} Task data or null
   */
  async findTaskByTitle(title) {
    const query = `
      SELECT id, title, description, creation_date, scheduled_date, execution_date, status, task_type, priority, lead_id, customer_id, created_at, updated_at, organization_id, profile_id
      FROM tasks 
      WHERE title = $1
    `;

    const result = await this.query(query, [title]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  /**
   * Delete task by title
   * @param {string} title - Task title
   * @returns {Promise<Object>} Deletion result
   */
  async deleteTaskByTitle(title) {
    console.log(`🗑️  Deleting task with title: ${title}`);

    // First, find the task to get its details
    const task = await this.findTaskByTitle(title);

    if (task) {
      // Delete the task
      const result = await this.query('DELETE FROM tasks WHERE title = $1 RETURNING *', [title]);

      console.log(`✅ Task deleted:`, result.rows[0]);
      return { deleted: true, task: result.rows[0] };
    } else {
      console.log(`❌ No task found to delete: ${title}`);
      return { deleted: false, task: null };
    }
  }

  /**
   * Close database connection
   */
  async disconnect() {
    if (this.client) {
      await this.client.end();
      this.client = null;
      console.log('✅ Database connection closed');
    }
  }
}

// Create a singleton instance
const dbUtils = new DatabaseUtils();

// Export for use in Cypress tests
module.exports = dbUtils;

// Simple test to verify DB connection and query organizations
if (require.main === module) {
  (async () => {
    try {
      await dbUtils.connect();
      const result = await dbUtils.query('SELECT * FROM organizations;');
      console.log('Organizations:', result.rows);
      await dbUtils.disconnect();
      process.exit(0);
    } catch (err) {
      console.error('Test DB connection failed:', err);
      process.exit(1);
    }
  })();
}
