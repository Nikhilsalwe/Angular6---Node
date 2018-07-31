import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
    selector: 'app-post-list',// this will render in post-create comp
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

    posts: Post[] = [];
    private postsSub: Subscription; // see the details below

    constructor(public postsServices: PostsService) {}

    ngOnInit() {
        this.posts = this.postsServices.getPosts();
        this.postsSub = this.postsServices.getPostUpdatedListerner()
            .subscribe((posts: Post[]) => {
                this.posts = posts;
            });
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}

//subscribe method accept 3 argument 1st callback func when sucess
//2nd whn error occure 3rd when observal complete so here we are using 1st arg
// with arrow function

// we are using this Subscription because to end the subcribe of object when we use multiple
// component many time obswrvale remain in memory to end that we use this
