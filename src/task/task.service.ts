/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { Task} from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TaskService {

    constructor(private prisma: PrismaService){}

    async GetAllTasks(): Promise<Task[]>{
        return this.prisma.task.findMany();
    }
    
    async GetOneTask(id: number): Promise<Task>{
        return this.prisma.task.findUnique({
            where: {
                id
            }
        })
    }

    async CreateTask(data: Task): Promise<Task>{
        return this.prisma.task.create({data});
    }
    
    async UpdateTask(id: number, data: Task): Promise<Task>{
        return this.prisma.task.update({
            where: {id},
            data
        });
    }

    async DeleteTask(id: number): Promise<Task>{
        return this.prisma.task.delete({
            where: {id}
        })
    }

}