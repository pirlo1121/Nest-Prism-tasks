/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import {Task} from "@prisma/client"

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService){}

    @Get()
    async GetAllTask(){
        try {
            return this.taskService.GetAllTasks();
            
        } catch (error) {
            console.log("error al obtener las tareas")
            
        }
    }

    @Get(':id')
    async GetOne(@Param('id') id: string){
        // return this.taskService.GetOneTask(Number(id));
        const taskFound = await this.taskService.GetOneTask(Number(id));
        if (!taskFound) throw new BadRequestException('Task does not exist');
        return taskFound;
    }

    @Delete(':id')
    async DeleteTask(@Param('id') id: string){
        // return this.taskService.DeleteTask(Number(id));
        try {
            return await this.taskService.DeleteTask(Number(id));
          } catch (error) {
            throw new BadRequestException('Task does not exist');
          }
    }


    @Post()
    async CreateTask(@Body() data: Task){
        return this.taskService.CreateTask(data)
    }

    @Put(':id')
    async UpdateTask(@Body() data: Task, @Param('id')id: string){
        try {
            return await this.taskService.UpdateTask(Number(id), data)
          } catch (error) {
            throw new BadRequestException('Task does not exist');
          }
    }
}