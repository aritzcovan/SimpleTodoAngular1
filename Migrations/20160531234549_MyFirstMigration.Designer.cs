using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using oldAng.Models;

namespace oldAng.Migrations
{
    [DbContext(typeof(TodoContext))]
    [Migration("20160531234549_MyFirstMigration")]
    partial class MyFirstMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rc2-20896");

            modelBuilder.Entity("oldAng.Models.TodoItem", b =>
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
