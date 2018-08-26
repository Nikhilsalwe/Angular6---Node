import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];//  you can't edit it from pout side
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient, private router: Router){}
    getPosts() {
      this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            }
          });
        }))
        .subscribe((transformPosts) => {
          this.posts = transformPosts;
          this.postsUpdated.next([...this.posts]);
        });
        // return [...this.posts];// here we want to send the post this.posts is array so we cannt
        //just return it because it just hold ref of that object so
        //here we use type script spread oprator
        // so now it will return new array
    }

    //this function is to get single post for editing
    getPost(id: string) {
      console.log(';in ui' , id)
      return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id)
    }

    getPostUpdatedListerner() {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post:Post = {id: null, title: title, content: content};
        this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
          .subscribe((responseData) => {
            const id = responseData.postId;
            post.id = id;
            console.log(responseData.message);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(["/"]);
          });
    }

    updatePost(id: string, title: string, content: string) {
      const post: Post = { id: id,  title: title, content: content };
      this.http.put('http://localhost:3000/api/posts/'+id, post)
        .subscribe(response => {
          const updatedPosts = [...this.posts];
          const olDPostIndex = updatedPosts.findIndex(p => p.id === post.id);
          updatedPosts[olDPostIndex] = post;
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
          this.router.navigate(["/"]);
        })
    }

    deletePost(postId: string) {
      this.http.delete('http://localhost:3000/api/posts/'+postId)
        .subscribe(() => {
          const updatedPosts = this.posts.filter(post => post.id !== postId);
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
        });
    }
}
