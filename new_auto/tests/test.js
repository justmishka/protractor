describe('angularjs homepage todo list', function() {

    it('should add a todo', function() {
        browser.get(urls.home());

        main.toDoText().sendKeys('write first protractor test');
        main.add().click();

        var todoList = element.all(main.toDoListItem().locator());
        expect(todoList.count()).toEqual(3);
        expect(todoList.get(2).getText()).toEqual('write first protractor test');

        // You wrote your first test, cross it off the list
        todoList.get(2).element(main.input().locator()).click();
        var completedAmount = element.all(main.doneTrue().locator());
        expect(completedAmount.count()).toEqual(2);

    });

});
