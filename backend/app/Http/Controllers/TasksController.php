<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Task;

class TasksController extends Controller
{
    public function index()
    {
        return Task::all()->toArray();
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required',
            'descricao' => 'required',
            'responsavel' => 'required',
        ]);

        return Task::create($request->all());
    }

    public function show(string $id)
    {
        return Task::findOrfail($id);
    }

    public function create()
    {
    }

    public function edit(string $id)
    {
    }

    public function update(Request $request, string $id)
    {
    }

    public function destroy(string $id)
    {
    }
}
