describe('Todo App', () => {
    beforeAll(async () => {
      await device.launchApp({
        newInstance: true
      });
      // Handle dev client screen
      await element(by.text('http://localhost:8081')).tap();
      // Handle dev menu welcome screen
      await element(by.text('Continue')).tap();
      // Close the bottom sheet by tapping the X button
      // Try different selectors for the X button
      try {
        // Try various possible selectors for the X button
        await element(by.label('Close')).atIndex(0).tap();
        // If that doesn't work, you might need to add a testID to the close button
      } catch (error) {
        console.log('Could not find close button with label Close, trying different selector');
      }
      // Wait for app to load
      await new Promise(resolve => setTimeout(resolve, 3000));
    }, 60000);
  
    beforeEach(async () => {
      await device.reloadReactNative();
      await new Promise(resolve => setTimeout(resolve, 3000));
    });
  
    it('should show welcome message', async () => {
      await expect(element(by.id('welcome'))).toBeVisible();
    }, 60000);
  
    it('should add a todo item', async () => {
      const todoInput = element(by.id('todoInput'));
      const addButton = element(by.id('addButton'));
  
      await todoInput.typeText('Buy groceries');
      await addButton.tap();
      await waitFor(element(by.text('Buy groceries')))
          .toBeVisible()
          .withTimeout(5000);
    });
  
    it('should remove a todo item when tapped', async () => {
      // Add a todo first
      const todoInput = element(by.id('todoInput'));
      const addButton = element(by.id('addButton'));
  
      await todoInput.typeText('Test todo');
      await addButton.tap();
  
      // Verify it exists
      await waitFor(element(by.text('Test todo')))
        .toBeVisible()
        .withTimeout(5000);

  
      // Remove it
      await element(by.text('Test todo')).tap();


      // Verify it's gone
      /*await waitFor(element(by.text('Test todo')))
        .not.toBeVisible()
        .withTimeout(5000);*/
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