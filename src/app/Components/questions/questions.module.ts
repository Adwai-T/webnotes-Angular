import { NgModule } from '@angular/core';

import { QuestionsComponent } from './questions.component';
import { QuestionComponent } from './question/question.component';
import { QuizComponent } from './quiz/quiz.component';
import { EditquestionsComponent } from './editquestions/editquestions.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionsRoutingModule } from './questions-routes.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        QuestionsRoutingModule,
        RouterModule
    ],
    exports: [],
    declarations: [
        QuestionsComponent,
        QuestionComponent,
        QuizComponent,
        EditquestionsComponent,
    ],
    providers: [],
})
export class QuestionsModule { }
