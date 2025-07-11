const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

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
    const sslEnabled =
      config.ssl !== false && process.env.SUPABASE_DB_SSL !== "false";

    if (sslEnabled) {
      // Use custom CA if available
      try {
        const certPath = path.join(__dirname, "../../certs/prod-ca-2021.crt");
        if (fs.existsSync(certPath)) {
          const ca = fs.readFileSync(certPath).toString();
          sslConfig = { ca, rejectUnauthorized: true };
          console.log("🔐 Using custom SSL certificate");
        } else {
          // Fallback if cert not found
          sslConfig = { rejectUnauthorized: false };
          console.log(
            "🔐 Using SSL without custom certificate (rejectUnauthorized: false)"
          );
        }
      } catch (e) {
        // Fallback if cert not found
        sslConfig = { rejectUnauthorized: false };
        console.log(
          "🔐 Using SSL without custom certificate (rejectUnauthorized: false)"
        );
      }
    } else {
      console.log("🔐 SSL disabled via configuration");
    }

    const dbConfig = {
      host:
        config.host ||
        process.env.SUPABASE_DB_HOST ||
        "aws-0-us-west-1.pooler.supabase.com",
      port: config.port || process.env.SUPABASE_DB_PORT || 5432,
      database: config.database || process.env.SUPABASE_DB_NAME || "postgres",
      user:
        config.user ||
        process.env.SUPABASE_DB_USER ||
        "postgres.zvznmlhfktxxvjcyjdpe",
      password: config.password || process.env.SUPABASE_DB_PASSWORD,
      ssl: sslConfig,
    };

    // Validate required credentials
    if (!dbConfig.password) {
      throw new Error(
        "Database password is required. Please set SUPABASE_DB_PASSWORD in your .env file."
      );
    }

    console.log("🔌 Attempting to connect to database...");
    console.log("📍 Host:", dbConfig.host);
    console.log("🚪 Port:", dbConfig.port);
    console.log("🗄️  Database:", dbConfig.database);
    console.log("👤 User:", dbConfig.user);
    console.log("🔐 SSL:", sslConfig ? "Enabled" : "Disabled");

    this.client = new Client(dbConfig);
    await this.client.connect();
    console.log("✅ Connected to database successfully");
  }

  /**
   * Execute a query
   * @param {string} query - SQL query
   * @param {Array} params - Query parameters
   * @returns {Promise<Object>} Query result
   */
  async query(query, params = []) {
    if (!this.client) {
      throw new Error("Database not connected. Call connect() first.");
    }

    try {
      const result = await this.client.query(query, params);
      return result;
    } catch (error) {
      console.error("Database query error:", error);
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
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    const result = await this.query(query, params);
    return parseInt(result.rows[0].count);
  }

  /**
   * Close database connection
   */
  async disconnect() {
    if (this.client) {
      await this.client.end();
      this.client = null;
      console.log("✅ Database connection closed");
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
      const result = await dbUtils.query("SELECT * FROM organizations;");
      console.log("Organizations:", result.rows);
      await dbUtils.disconnect();
      process.exit(0);
    } catch (err) {
      console.error("Test DB connection failed:", err);
      process.exit(1);
    }
  })();
}
