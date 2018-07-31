import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];//  you can't edit it from pout side
    private postsUpdated = new Subject<Post[]>();

    getPosts() {
        return [...this.posts];// here we want to send the post this.posts is array so we cannt
        //just return it because it just hold ref of that object so 
        //here we use type script spread oprator
        // so now it will return new array
    }

    getPostUpdatedListerner() {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post:Post = {title: title, content: content};
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }
}