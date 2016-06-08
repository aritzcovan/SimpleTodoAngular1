using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using SimpTodo1.Models;

namespace SimpTodo1.Migrations
{
    [DbContext(typeof(TodoContext))]
    partial class TodoContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rc2-20896");

            modelBuilder.Entity("SimpTodo1.Models.TodoItem", b =>
                {
                    b.Property<int>("TodoId")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsComplete");

                    b.Property<string>("Name");

                    b.HasKey("TodoId");

                    b.ToTable("Todos");
                });
        }
    }
}
