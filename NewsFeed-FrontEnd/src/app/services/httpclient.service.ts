import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from '../model/postmodel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  private postsUrl = 'http://localhost:8000/api/posts';  // URL to web api
  constructor( 
    private http: HttpClient
  ) { }

  getPostModels (): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.postsUrl)
  }

  getPostModel(id: number): Observable<PostModel> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<PostModel>(url);
  }

  addPostModel (posts: PostModel): Observable<any> {
    return this.http.post<any>(this.postsUrl, posts, httpOptions);
  }

  deletePostModel (posts: PostModel | number): Observable<any> {
    const id = typeof posts === 'number' ? posts : posts.id;
    const url = `${this.postsUrl}/${id}`;

    return this.http.delete<any>(url, httpOptions);
  }

  updatePostModel (posts: PostModel): Observable<any> {
    return this.http.put<any>(this.postsUrl, posts, httpOptions);
  }
}
