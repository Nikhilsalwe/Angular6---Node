import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";

@Component({
    selector: 'app-post-create',// this will render in app comp.
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    enteredTitle = '';
    enteredContent = '';
    //@Output () postCreated = new EventEmitter<Post>(); // added event emitter to track the post and to access it outside comp
    //means parent comp we use @output module
    //@output not require since we are using service so remove depandancy also

    constructor(public postsService: PostsService){};
    onAddPost(form: NgForm) {
        if(form.invalid) {
            return;
        }

        this.postsService.addPost(form.value.title, form.value.content);
        form.resetForm();
    }
}
