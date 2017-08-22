var Main = function() {

    this.toDoText = function() {
        return element(by.model('todoList.todoText'));
    };

    this.add = function() {
        return $('[value="add"]');
    };

    this.doneTrue = function() {
        return $('.done-true');
    };

    this.toDoListItem = function() {
        return element(by.repeater('todo in todoList.todos'));
    };

    this.input = function() {
        return $('input');
    };

};

module.exports = Main;
