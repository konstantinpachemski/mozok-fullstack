"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle, CircleCheckBig } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InferType, boolean, object, string } from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import withAuth from "../../authhoc-wrapper";
import { yupResolver } from "@hookform/resolvers/yup";

interface TodoItem {
  key?: string;
  title: string;
  completed: boolean;
}

const FormSchema = object({
  title: string().required("Cannot be empty"),
  completed: boolean().default(false),
});

function Todo() {
  const form = useForm<InferType<typeof FormSchema>>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  const [todos, setTodos] = useState([
    { title: "Bake a bread", completed: false },
    {
      title: "Hunt some bears",
      completed: true,
    },
    { title: "Climb vodno 10x", completed: false },
  ]);

  const addTodo = (todo: TodoItem) => {
    setTodos([...todos, todo]);
    form.reset();
  };

  const editTodo = (title: string, index: number) => {
    setTodos((prev: TodoItem[]) => {
      const result = [...prev];
      result[index] = { ...result[index], title };
      return result;
    });
  };

  const removeTodo = (title: string) => {
    setTodos(todos.filter((item) => item.title !== title));
  };

  const toggleTodo = (title: string) => {
    setTodos(
      todos.map((item) =>
        item.title === title ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const getCompletedTodos = () => {
    return todos.filter((item: TodoItem) => item.completed === true).length;
  };

  return (
    <div className="container flex flex-grow items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Todo</CardTitle>
        </CardHeader>
        <CardContent>
          <TodoHero
            todos_completed={getCompletedTodos()}
            total_todos={todos.length}
          />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => addTodo(form.getValues()))}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add a new task</FormLabel>
                        <FormControl>
                          <div className="flex gap-8">
                            <Input
                              type="text"
                              placeholder="Bake 10 cakes"
                              required
                              {...field}
                            />
                            <Button
                              className="hover:scale-105 transition bg-green-600 hover:bg-green-500"
                              type="submit"
                            >
                              Add
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
          <div className="py-4">
            <ul>
              {todos && todos.length > 0 ? (
                todos?.map((item, index) => (
                  <div key={index} className="w-full justify-between flex py-2">
                    <div className="w-full flex gap-4 items-center">
                      <div className="w-full flex items-center space-x-2 pr-4">
                        <Button
                          onClick={() => toggleTodo(item.title)}
                          variant="ghost"
                          size="icon"
                          className="hover:scale-110 transition"
                        >
                          {item.completed ? <CircleCheckBig /> : <Circle />}
                        </Button>
                        <Input
                          value={item.title}
                          className="w-full"
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            editTodo(e.target.value, index)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => removeTodo(item.title)}
                        variant="destructive"
                        className="hover:scale-105 transition"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Seems lonely in here, what are you up to?</p>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TodoHero({
  todos_completed,
  total_todos,
}: {
  todos_completed: number;
  total_todos: number;
}) {
  return (
    <div className="flex justify-center font-medium pb-4">
      <p className="hover:scale-110 transition">
        Tasks completed: {todos_completed}/{total_todos}
      </p>
    </div>
  );
}

export default withAuth(Todo);
