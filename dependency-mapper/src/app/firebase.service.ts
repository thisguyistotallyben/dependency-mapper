import { Injectable } from '@angular/core';
import { Guid } from "guid-typescript";
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, get, child, update, Database } from 'firebase/database'
import { Subscription } from 'rxjs';
import { DataService, Ticket } from './data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  db: Database;
  mapId: string;
  exists: boolean;

  // paths
  basePath: string;
  titlePath: string;
  ticketPath: string;
  dependencyPath: string;
  tagPath: string;

  // subscriptions
  titleSubscription: Subscription;
  ticketSubscription: Subscription;
  dependencySubscription: Subscription;
  tagSubscription: Subscription;

  constructor(private dataService: DataService, private router: Router) {
    this.exists = false;

    const firebaseConfig = {
      // fill in relevant info here
    };

    initializeApp(firebaseConfig);
    this.db = getDatabase();

    this.dataService.newMapObserver.subscribe(
      x => this.createNewMap(),
      err => console.error('oopsie poopsie', err),
      () => console.warn('title observer finished')
    );
  }

  public async loadMap(id: string) {
    this.setPaths(id);
    await this.checkExistence();

    if (this.exists) {
      this.dataService.mapId = id;
      this.setTitleWatchers();
      this.setTicketWatchers();
      this.setDependencyWatchers();
      this.setTagWatchers();
    } else {
      this.dataService.mapId = undefined;
      this.dataService.title = '';
      this.unsubscribeToObservers();
      this.router.navigateByUrl('/');
    }
  }

  private setPaths(id: string): void {
    this.mapId = id;
    this.basePath = `maps/${this.mapId}`;
    this.titlePath = `${this.basePath}/title`;
    this.ticketPath = `${this.basePath}/tickets`;
    this.dependencyPath = `${this.basePath}/dependencies`;
    this.tagPath = `${this.basePath}/tags`;
  }

  private async checkExistence() {
    const existsRef = ref(this.db);
    const init = await get(child(existsRef, `${this.basePath}/init`));
    this.exists = init.val();
  }

  private setTitleWatchers() {
    const nameRef = ref(this.db, this.titlePath);
    onValue(nameRef, (snapshot) => {
      const data = snapshot.val();
      console.log('wow data', data);
      this.dataService.setTitle(data);
    });

    this.titleSubscription = this.dataService.titleObserver.subscribe(
      x => this.updateTitle(),
      err => console.error('oopsie poopsie', err),
      () => console.warn('title observer finished')
    );
  }

  private setTicketWatchers() {
    const ticketRef = ref(this.db, this.ticketPath);
    onValue(ticketRef, (snapshot) => {
      const data = snapshot.val();
      console.log('ticket data', data);
      this.dataService.ticketLookup = data ? data : {};
      this.dataService.ticketObserver.next();
    });

    this.ticketSubscription = this.dataService.ticketObserver.subscribe(
      x => this.updateTickets(),
      err => console.error('oopsie poopsie', err),
      () => console.warn('title observer finished')
    );
  }

  private setDependencyWatchers() {
    const depRef = ref(this.db, this.dependencyPath);
    onValue(depRef, (snapshot) => {
      const data = snapshot.val();
      console.log('dependency data', data);
      this.dataService.dependencyLookup = data ? data : [];
      this.dataService.dependencyObserver.next();
    });

    this.ticketSubscription = this.dataService.dependencyObserver.subscribe(
      x => this.updateDependencies(),
      err => console.error('oopsie poopsie', err),
      () => console.warn('title observer finished')
    );
  }

  private setTagWatchers() {
    const depRef = ref(this.db, this.tagPath);
    onValue(depRef, (snapshot) => {
      const data = snapshot.val();
      console.log('tag data', data);
      this.dataService.tagLookup = data ? data : {};
      this.dataService.tagObserver.next();
    });

    this.tagSubscription = this.dataService.tagObserver.subscribe(
      x => this.updateTags(),
      err => console.error('oopsie poopsie', err),
      () => console.warn('title observer finished')
    );
  }

  private unsubscribeToObservers() {
    this.titleSubscription?.unsubscribe();
    this.ticketSubscription?.unsubscribe();
    this.dependencySubscription?.unsubscribe();
    this.tagSubscription?.unsubscribe();
  }

  public createNewMap(): void {
    const id = Guid.raw();
    const updateFields = {};
    updateFields[`maps/${id}`] = {};
    updateFields[`maps/${id}`]['init'] = true;
    updateFields[`maps/${id}`]['title'] = this.dataService.title;

    update(ref(this.db), updateFields);
    this.router.navigateByUrl(`/${id}`);
  }

  public updateTitle(): void {
    const updateFields = {};
    updateFields[this.titlePath] = this.dataService.title;

    update(ref(this.db), updateFields);
  }

  private updateTickets() {
    console.log('updating tickets');
    const updateFields = {};
    updateFields[this.ticketPath] = this.dataService.ticketLookup;
    update(ref(this.db), updateFields);
  }

  private updateDependencies() {
    console.log('updating dependencies');
    const updateFields = {};
    updateFields[this.dependencyPath] = this.dataService.dependencies;
    update(ref(this.db), updateFields);
  }

  private updateTags() {
    console.log('updating tags');
    const updateFields = {};
    updateFields[this.tagPath] = this.dataService.tagLookup;
    update(ref(this.db), updateFields);
  }
}
