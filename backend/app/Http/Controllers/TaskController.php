<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/tasks",
     *     tags={"Tasks"},
     *     summary="List all tasks",
     *     description="Retrieve a paginated list of tasks.",
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=false,
     *         @OA\Schema(
     *             type="integer",
     *             example="Page"
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Success",
     *         @OA\JsonContent(
     *                 @OA\Property(property="current_page", type="integer"),
     *                 @OA\Property(property="data", type="array",
     *                     @OA\Items(
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="title", type="string"),
     *                         @OA\Property(property="description", type="string"),
     *                         @OA\Property(property="responsible", type="string"),
     *                         @OA\Property(property="completed", type="boolean"),
     *                     ),
     *                 ),
     *                 @OA\Property(property="first_page_url", type="string"),
     *                 @OA\Property(property="from", type="integer"),
     *                 @OA\Property(property="last_page", type="integer"),
     *                 @OA\Property(property="last_page_url", type="string"),
     *                 @OA\Property(property="links", type="array",
     *                     @OA\Items(
     *                         @OA\Property(property="url", type="string"),
     *                         @OA\Property(property="label", type="string"),
     *                         @OA\Property(property="active", type="boolean"),
     *                     ),
     *                 ),
     *                 @OA\Property(property="next_page_url", type="string"),
     *                 @OA\Property(property="path", type="string"),
     *                 @OA\Property(property="per_page", type="integer"),
     *                 @OA\Property(property="prev_page_url", type="string"),
     *                 @OA\Property(property="to", type="integer"),
     *                 @OA\Property(property="total", type="integer"),
     *             ),
     *     ),
     * )
     */
    public function getAll(): JsonResponse
    {
        try {
            $tasks = Task::paginate(6);
            $tasks->getCollection()->transform(function ($task) {
                return $this->transformCompleted($task);
            });
            return response()->json([$tasks]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao obter as tarefas'], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/tasks",
     *     tags={"Tasks"},
     *     summary="Create a task",
     *     description="Create a task for a to-do list",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="title", type="string"),
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="responsible", type="string"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="description", type="string"),
     *                 @OA\Property(property="responsible", type="string"),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Dados Inválidos"),
     *             @OA\Property(property="errors", type="object",
     *                 @OA\Property(property="title", type="array",
     *                     @OA\Items(type="string")
     *                 ),
     *     @OA\Property(property="description", type="array",
     *                      @OA\Items(type="string")
     *                  ),
     *     @OA\Property(property="responsible", type="array",
     *                      @OA\Items(type="string")
     *                  ),
     *             ),
     *         ),
     *     ),
     * )
     */
    public function create(Request $request): JsonResponse
    {
        $validator = $this->validateTaskData($request);

        if ($validator->fails()) {
            return response()->json(['message' => 'Dados Inválidos', 'errors' => $validator->errors()], 400);
        }

        try {
            $newTask = Task::create($request->all());
            return response()->json(['data' => $newTask], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao criar a tarefa'], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/tasks/{id}",
     *     tags={"Tasks"},
     *     summary="Get a specific task",
     *     description="Get a specific task from the list by providing its ID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer"),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="description", type="string"),
     *                 @OA\Property(property="responsible", type="string"),
     *                 @OA\Property(property="completed", type="boolean"),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response="404",
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *         ),
     *     ),
     * )
     */
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

    /**
     * @OA\Put(
     *     path="/api/tasks/{id}",
     *     tags={"Tasks"},
     *     summary="Update a task",
     *     description="Update an existing task in the to-do list",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string"),
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="title", type="string"),
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="responsible", type="string"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="description", type="string"),
     *                 @OA\Property(property="responsible", type="string"),
     *                 @OA\Property(property="concluded", type="boolean"),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Dados Inválidos"),
     *             @OA\Property(property="errors", type="object",
     *                 @OA\Property(property="title", type="array",
     *                     @OA\Items(type="string")
     *                 ),
     *                 @OA\Property(property="description", type="array",
     *                     @OA\Items(type="string")
     *                 ),
     *                 @OA\Property(property="responsible", type="array",
     *                     @OA\Items(type="string")
     *                 ),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response="404",
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *         ),
     *     ),
     * )
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $validator = $this->validateTaskData($request);

        if ($validator->fails()) {
            return response()->json(['message' => 'Dados Inválidos', 'errors' => $validator->errors()], 400);
        }

        try {
            $existingTask = $this->findTaskById($id);

            if (!$existingTask) {
                return $this->taskNotFoundResponse();
            }

            $existingTask->update($request->all());

            return response()->json(['data' => $this->transformCompleted($existingTask)], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao atualizar a tarefa'], 500);
        }
    }

    /**
     * @OA\Patch(
     *     path="/api/tasks/{id}/uncompleted",
     *     tags={"Tasks"},
     *     summary="Mark a task as uncompleted",
     *     description="Mark an existing task as uncompleted in the to-do list",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string"),
     *     ),
     *     @OA\Response(
     *         response="204",
     *         description="No Content",
     *     ),
     *     @OA\Response(
     *         response="404",
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response="500",
     *         description="Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string"),
     *         ),
     *     ),
     * )
     */
    public function uncompleted(string $id): JsonResponse
    {
        try {
            $existingTask = $this->findTaskById($id);

            if (!$existingTask) {
                return $this->taskNotFoundResponse();
            }

            $existingTask->completed = false;
            $existingTask->save();

            return response()->json([], 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao atualizar o status da tarefa'], 500);
        }
    }

    /**
     * @OA\Patch(
     *     path="/api/tasks/{id}/completed",
     *     tags={"Tasks"},
     *     summary="Mark a task as completed",
     *     description="Mark an existing task as completed in the to-do list",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string"),
     *     ),
     *     @OA\Response(
     *         response="204",
     *         description="No Content",
     *     ),
     *     @OA\Response(
     *         response="404",
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response="500",
     *         description="Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string"),
     *         ),
     *     ),
     * )
     */
    public function completed(string $id): JsonResponse
    {
        try {
            $existingTask = $this->findTaskById($id);

            if (!$existingTask) {
                return $this->taskNotFoundResponse();
            }

            $existingTask->completed = true;
            $existingTask->save();

            return response()->json([], 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao atualizar o status da tarefa'], 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/tasks/{id}",
     *     tags={"Tasks"},
     *     summary="Delete a task",
     *     description="Delete an existing task from the to-do list",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string"),
     *     ),
     *     @OA\Response(
     *         response="204",
     *         description="No Content",
     *     ),
     *     @OA\Response(
     *         response="404",
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response="500",
     *         description="Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string"),
     *         ),
     *     ),
     * )
     */
    public function delete(string $id): JsonResponse
    {
        try {
            $existingTask = $this->findTaskById($id);

            if (!$existingTask) {
                return $this->taskNotFoundResponse();
            }

            $existingTask->delete();

            return response()->json([], 204);
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
        $task->completed = (bool)$task->completed;
        return $task;
    }

    private function validateTaskData(Request $request): \Illuminate\Validation\Validator
    {
        $rules = [
            'title' => 'required|string',
            'description' => 'required|string',
            'responsible' => 'required|string',
        ];

        $messages = [
            'title.required' => 'O campo título é obrigatório.',
            'title.string' => 'O campo título deve ser uma string.',
            'description.required' => 'O campo descrição é obrigatório.',
            'description.string' => 'O campo descrição deve ser uma string.',
            'responsible.required' => 'O campo responsável é obrigatório.',
            'responsible.string' => 'O campo responsável deve ser uma string.',
        ];

        return Validator::make($request->all(), $rules, $messages);
    }
}
