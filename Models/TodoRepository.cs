using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;


namespace SimpTodo1.Models
{

    public class TodoRepository : ITodoRepository
    {
        public DbSet<TodoItem> GetAll()
        {
            return new TodoContext().Todos;
        }

        public bool Add(TodoItem item)
        {
            var retval = 0;
            using (var db = new TodoContext())
            {
                db.Todos.Add(item);
                retval = db.SaveChanges();
            }
            return retval > 0;
        }
        
        public bool UpdateTodo(TodoItem item)
        {
            var retval = 0;
            using (var db = new TodoContext())
            {

                db.Todos.Update(item);
                retval = db.SaveChanges();
            }
            return retval > 0;
        }

        public bool DeleteTodo(string id)
        {
            var retval = 0;
            using (var db = new TodoContext())
            {
                var todo = db.Todos.First(t => t.TodoId == Convert.ToInt32(id));
                db.Todos.Remove(todo);
                retval = db.SaveChanges();
            }
            return retval > 0;
        }
        
        public bool MarkComplete(TodoItem item)
        {
            var retval = 0;
            using(var db = new TodoContext())
            {
                db.Todos.Update(item);
                retval = db.SaveChanges();
            }
            return retval > 0;
        }
        
        public TodoItem Get(int id)
        {
            using(var db = new TodoContext())
            {
                return db.Todos.First(t => t.TodoId == id);
            }
        }
        
        
        /*
                static ConcurrentDictionary<string, TodoItem> _todos = new ConcurrentDictionary<string, TodoItem>();
                public TodoRepository()
                {
                    Add(new TodoItem { Name = "item1"});
                }
                
                public bool Add(TodoItem item)
                {
                    _todos[item.Key] = item;
                    item.Key = Guid.NewGuid().ToString();
                }

                public IEnumerable<TodoItem> GetAll()
                {
                    return _todos.Values;
                }
                
                public TodoItem Find(string key)
                {
                    TodoItem item;
                    _todos.TryGetValue(key, out item);
                    return item;
                }

                public TodoItem Remove(string key)
                {
                    TodoItem item;
                    _todos.TryGetValue(key, out item);
                    _todos.TryRemove(key, out item);
                    return item;
                }

                public void Update(TodoItem item)
                {
                    _todos[item.Key] = item;
                }
         */
    }
}
