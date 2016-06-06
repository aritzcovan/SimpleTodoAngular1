using Microsoft.EntityFrameworkCore;

namespace oldAng.Models
{
    public interface ITodoRepository
    {
        bool Add(TodoItem item);
        // IEnumerable<TodoItem> GetAll();
        DbSet<TodoItem> GetAll();
        // TodoItem Find(string key);
        // TodoItem Remove(string key);
        // void Update(TodoItem item);
        
        bool UpdateTodo(TodoItem item);
        bool DeleteTodo(string id);
        bool MarkComplete(TodoItem item);
        TodoItem Get(int id);
    }
}
