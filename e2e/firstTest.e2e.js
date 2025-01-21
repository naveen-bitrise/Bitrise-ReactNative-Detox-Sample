describe('Todo App', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
    });
  
    it('should show welcome message', async () => {
      await expect(element(by.id('welcome'))).toBeVisible();
    });
  
    it('should add a todo item', async () => {
      const todoInput = element(by.id('todoInput'));
      const addButton = element(by.id('addButton'));
  
      await todoInput.typeText('Buy groceries');
      await addButton.tap();
  
      await expect(element(by.id('todo-0'))).toBeVisible();
      await expect(element(by.id('todo-0'))).toHaveText('Buy groceries');
    });
  
    it('should remove a todo item when tapped', async () => {
      // Add a todo first
      const todoInput = element(by.id('todoInput'));
      const addButton = element(by.id('addButton'));
  
      await todoInput.typeText('Test todo');
      await addButton.tap();
  
      // Verify it exists
      await expect(element(by.id('todo-0'))).toBeVisible();
  
      // Remove it
      await element(by.id('todo-0')).tap();
  
      // Verify it's gone
      await expect(element(by.id('todo-0'))).not.toBeVisible();
    });
  
    it('should handle multiple todos', async () => {
      const todoInput = element(by.id('todoInput'));
      const addButton = element(by.id('addButton'));
  
      // Add multiple todos
      const todos = ['First todo', 'Second todo', 'Third todo'];
      for (const todo of todos) {
        await todoInput.typeText(todo);
        await addButton.tap();
      }
  
      // Verify all todos are visible
      for (let i = 0; i < todos.length; i++) {
        await expect(element(by.id(`todo-${i}`))).toBeVisible();
      }
    });
  });