<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function getAll()
    {
        return Task::orderBy('created_at', 'DESC')->get()->map(function ($task) {
            $task->completed = (bool) $task->completed;
            return $task;
        });
    }

    public function create(Request $request)
    {
        $newTask = new Task;
        $newTask->title = $request->item["title"];
        $newTask->description = $request->item["description"];
        $newTask->responsible = $request->item["responsible"];
        $newTask->completed = $request->item["completed"];
        $newTask->save();

        return $newTask;
    }

    public function getById(string $id)
    {
        $existingTask = Task::find($id);

        if(!$existingTask) return 'Tarefa não encontrada';

        return $existingTask;
    }

    public function update(Request $request, string $id)
    {
        $existingTask = Task::find($id);

        if($existingTask) {
            $existingTask->title = $request->item["title"];
            $existingTask->description = $request->item["description"];
            $existingTask->responsible = $request->item["responsible"];
            $existingTask->completed = $request->item["completed"];
            $existingTask->save();
            return $existingTask;
        }

        return 'Tarefa não encontrada';
    }

    public function uncompleted(string $id) {
        $existingTask = Task::find($id);

        if (!$existingTask) {
            return 'Tarefa não encontrada';
        }

        if (!$existingTask->completed) {
            return 'Tarefa já está desconcluída';
        }

        $existingTask->completed = false;
        $existingTask->save();

        return 'Tarefa marcada como desconcluída com sucesso';
    }

    public function completed(string $id) {
        $existingTask = Task::find($id);

        if (!$existingTask) {
            return 'Tarefa não encontrada';
        }

        if ($existingTask->completed) {
            return 'Tarefa já está concluida';
        }

        $existingTask->completed = true;
        $existingTask->save();

        return 'Tarefa marcada como concluída com sucesso';
    }

    public function delete(string $id)
    {
        $existingTask = Task::find($id);

        if($existingTask) {
            $existingTask->delete();
            return "Tarefa deleta com sucesso.";
        }

        return 'Tarefa não encontrada';
    }
}
