<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function getAll(): JsonResponse
    {
        try {
            $tasks = Task::paginate(10);
            $tasks->getCollection()->transform(function ($task) {
                return $this->transformCompleted($task);
            });
            return response()->json(['data' => $tasks]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao obter as tarefas'], 500);
        }
    }

    public function create(Request $request): JsonResponse
    {
        try {
            $newTask = Task::create($request->all());
            return response()->json(['data' => $newTask], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao criar a tarefa'], 500);
        }
    }

    public function getById(string $id): JsonResponse
    {
        try {
            $existingTask = $this->findTaskById($id);

            if (!$existingTask) {
                return $this->taskNotFoundResponse();
            }

            return response()->json(['data' => $this->transformCompleted($existingTask)]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao obter a tarefa'], 500);
        }
    }

    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $existingTask = $this->findTaskById($id);

            if (!$existingTask) {
                return $this->taskNotFoundResponse();
            }

            $existingTask->update($request->all());

            return response()->json(['data' => $this->transformCompleted($existingTask)], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao atualizar a tarefa'], 500);
        }
    }

    public function uncompleted(string $id): JsonResponse
    {
        try {
            $existingTask = $this->findTaskById($id);

            if (!$existingTask) {
                return $this->taskNotFoundResponse();
            }

            if ($existingTask->completed) {
                $existingTask->update(['completed' => false]);
                return response()->json(['message' => 'Tarefa marcada como não concluída com sucesso']);
            }

            return response()->json(['message' => 'A tarefa já está marcada como não concluída']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao atualizar o status da tarefa'], 500);
        }
    }

    public function completed(string $id): JsonResponse
    {
        try {
            $existingTask = $this->findTaskById($id);

            if (!$existingTask) {
                return $this->taskNotFoundResponse();
            }

            if ($existingTask->completed) {
                return response()->json(['message' => 'Tarefa já está concluída']);
            }

            $existingTask->completed = true;
            $existingTask->save();

            return response()->json(['message' => 'Tarefa marcada como concluída com sucesso']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao atualizar o status da tarefa'], 500);
        }
    }

    public function delete(string $id): JsonResponse
    {
        try {
            $existingTask = $this->findTaskById($id);

            if (!$existingTask) {
                return $this->taskNotFoundResponse();
            }

            $existingTask->delete();

            return response()->json(['message' => 'Tarefa excluída com sucesso']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao excluir a tarefa'], 500);
        }
    }

    private function findTaskById(string $id)
    {
        return Task::find($id);
    }

    private function taskNotFoundResponse(): JsonResponse
    {
        return response()->json(['message' => 'Tarefa não encontrada'], 404);
    }

    private function transformCompleted(Task $task): Task
    {
        $task->completed = (bool) $task->completed;
        return $task;
    }
}
