import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { QuestionsComponent } from './questions.component';
import { QuizComponent } from './quiz/quiz.component';
import { EditquestionsComponent } from './editquestions/editquestions.component';
import { QuestionsGuard } from './questions-auth.guard';

export const routes: Routes = [
    { 
        path: '',
        component: QuestionsComponent,
        children: [
            { path: 'quiz', component: QuizComponent },
            { path: 'edit', component: EditquestionsComponent, canActivate: [QuestionsGuard] }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionsRoutingModule { }
