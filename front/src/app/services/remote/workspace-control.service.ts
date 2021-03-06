import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BACK_ROUTES } from 'src/app/constants';

import {
  CreateWorkspaceForm,
  CreateWorkspaceRes,
  CreateWorkspaceVars,
  JoinWorkspaceForm,
  JoinWorkspaceRes,
  JoinWorkspaceVars,
  VerifyPeerRes,
  VerifyPeerVars
} from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceControlService {

  public constructor(
    private readonly http: HttpClient
  ) {}

  public createWorkspace(
    form: CreateWorkspaceForm
  ): Observable<CreateWorkspaceRes> {
    const query = `mutation Create(
      $workspaceId: String!,
      $workspacePassword: String!,
      $userId: String!
    ) {
      createWorkspace(
        workspaceId: $workspaceId,
        workspacePassword: $workspacePassword,
        userId: $userId
      ) {
        yourPeerId
      }
    }`;
    const variables: CreateWorkspaceVars = {
      workspaceId: form.workspaceId,
      workspacePassword: form.workspacePassword,
      userId: form.userId
    }

    const httpOptions: {headers: HttpHeaders} = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<CreateWorkspaceRes>(
        BACK_ROUTES.API,
        JSON.stringify({query, variables}),
        httpOptions);
  }

  public joinWorkspace(
    form: JoinWorkspaceForm
  ): Observable<JoinWorkspaceRes> {
    const query = `mutation Join(
        $workspaceId: String!,
        $workspacePassword: String!,
        $userId: String!
    ) {
      joinWorkspace(
        workspaceId: $workspaceId,
        workspacePassword: $workspacePassword,
        userId: $userId
      ) {
        yourPeerId,
        otherPeerIds
      }
    }`;
    const variables: JoinWorkspaceVars = {
      workspaceId: form.workspaceId,
      workspacePassword: form.workspacePassword,
      userId: form.userId
    }

    const httpOptions: {headers: HttpHeaders} = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<JoinWorkspaceRes>(
        BACK_ROUTES.API,
        JSON.stringify({query, variables}),
        httpOptions);
  }

  public verifyPeer(
    peerId: string, workspaceId: string
  ): Observable<VerifyPeerRes> {
    const query = `query Verify(
        $peerId: String!,
        $workspaceId: String!
    ) {
      verifyPeer(
        peerId: $peerId,
        workspaceId: $workspaceId
      ) {
        valid
      }
    }`;
    const variables: VerifyPeerVars = {
      peerId,
      workspaceId
    }

    const httpOptions: {headers: HttpHeaders} = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<VerifyPeerRes>(
        BACK_ROUTES.API,
        JSON.stringify({query, variables}),
        httpOptions);
  }

}
