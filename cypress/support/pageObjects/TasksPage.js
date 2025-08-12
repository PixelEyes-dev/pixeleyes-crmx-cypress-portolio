class TasksPage {
  tasksPageTitle() {
    return cy.get('#tasksTitle');
  }
  addNewTaskButton() {
    return cy.get('#addTaskButton');
  }
  editTaskButton() {
    return cy.get('#taskEditButton');
  }
  deleteTaskButton() {
    return cy.get('#taskDeleteButton');
  }
  deleteTaskConfirmationButton() {
    return cy.get('button[type="button"]').contains('Delete');
  }
  addTaskModal() {
    return cy.get('div[role="dialog"]');
  }
  addTaskTitle() {
    return cy.get('div[role="dialog"] h2');
  }
  assignmentTypeCustomerRadioButton() {
    return cy.get('#task-input-assignment-type-customer');
  }
  assignmentTypeLeadRadioButton() {
    return cy.get('#task-input-assignment-type-lead');
  }
  selectCustomerSelectInput() {
    return cy.get('#task-input-customer');
  }
  taskTitleTextBox() {
    return cy.get('#task-input-title');
  }
  taskTypeSelectInput() {
    return cy.get('#task-input-type');
  }
  taskStatusSelectInput() {
    return cy.get('#task-input-status');
  }
  taskPrioritySelectInput() {
    return cy.get('#task-input-priority');
  }
  taskScheduledDateInput() {
    return cy.get('#task-input-scheduled-date');
  }
  taskExecutionDateInput() {
    return cy.get('#task-input-execution-date');
  }
  taskDescriptionTextBox() {
    return cy.get('#task-input-description');
  }
  saveTaskButton() {
    return cy.get('#task-btn-save');
  }
  cancelTaskButton() {
    return cy.get('#task-btn-cancel-footer');
  }
  successConfirmationMessage() {
    return cy.get('li[role="status"]');
  }
  editTaskTitle() {}
}

export default new TasksPage();
