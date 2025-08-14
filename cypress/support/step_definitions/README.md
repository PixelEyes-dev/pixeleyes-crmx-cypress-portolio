# Step Definitions Organization

This directory contains all Cucumber step definitions organized by feature domain for better maintainability and scalability.

## 📁 Directory Structure

```
cypress/support/step_definitions/
├── common/                          ← Shared steps across all features
│   ├── common.steps.js             ← Authentication, navigation, common actions
│   ├── homePageSanity.steps.js     ← Home page validation steps
│   └── example.steps.js            ← Example/demo steps
│
├── tasks/                           ← Task management feature steps
│   ├── createTaskAndDeleteFromBE.steps.js    ← Backend task operations
│   └── createTaskEditAndDeleteFromFE.steps.js ← Frontend task operations
│
├── sales/                           ← Sales feature steps (future use)
├── customers/                       ← Customer feature steps (future use)
└── leads/                           ← Lead feature steps (future use)
```

## 🔧 Import Paths

All step definition files use relative imports with the correct path depth:

- **Files in subfolders** (e.g., `tasks/`, `common/`) use `../../` to reach parent directories
- **Files in root** use `../` to reach parent directories

### Example Import Paths

```javascript
// From tasks/createTask.steps.js
import SideNavBar from '../../pageObjects/SideNavBar';
import TasksPage from '../../pageObjects/TasksPage';
import { generateTaskData } from '../../testDataGenerator';

// From common/common.steps.js
import SideNavBar from '../../pageObjects/SideNavBar';
import TasksPage from '../../pageObjects/TasksPage';
```

## 📋 Step Definition Categories

### Common Steps

- **Authentication**: Login, logout, permissions
- **Navigation**: Page navigation, sidebar actions
- **Validation**: Common assertions, success messages
- **General**: Home page sanity checks, examples

### Task Steps

- **Creation**: Task creation with various data sources
- **Editing**: Task modification and updates
- **Deletion**: Task removal (frontend and backend)
- **Verification**: Task existence and validation

## 🚀 Adding New Step Definitions

### 1. Choose the appropriate folder

- **Common functionality** → `common/`
- **Feature-specific** → `tasks/`, `sales/`, `customers/`, `leads/`

### 2. Follow naming conventions

- Use descriptive, unique step names
- Avoid duplicate step definitions across files
- Use consistent naming patterns within each domain

### 3. Update import paths

- Use correct relative paths based on file location
- Test imports after moving files

## ⚠️ Important Notes

- **Cucumber loads ALL step definitions** from this directory recursively
- **Step names must be unique** across all files
- **Import paths must be correct** for files to work
- **Feature files reference steps by name**, not by file path

## 🔍 Troubleshooting

### Common Issues

1. **Import errors**: Check relative path depth
2. **Duplicate step definitions**: Ensure step names are unique
3. **Missing steps**: Verify file is in correct folder and imports are correct

### Testing

After reorganizing, run your Cucumber tests to ensure all step definitions are found and working correctly.
