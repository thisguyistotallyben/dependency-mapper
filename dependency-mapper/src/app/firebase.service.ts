import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  onValue,
  get,
  child,
  update,
  Database,
} from 'firebase/database';
import { Subscription } from 'rxjs';
import { DataService, Ticket } from './data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  db: Database;
  mapId: string;
  exists: boolean;

  // paths
  basePath: string;
  titlePath: string;
  ticketPath: string;
  groupPath: string;
  dependencyPath: string;
  tagPath: string;

  // subscriptions
  titleSubscription: Subscription;
  ticketSubscription: Subscription;
  groupSubscription: Subscription;
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
      (x) => this.createNewMap(),
      (err) => console.error('oopsie poopsie', err),
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
      this.setGroupWatchers();
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
    this.groupPath = `${this.basePath}/groups`;
    this.dependencyPath = `${this.basePath}/dependencies`;
    this.tagPath = `${this.basePath}/tags`;
  }

  private async checkExistence() {
    const existsRef = ref(this.db);
    const init = await get(child(existsRef, `maps/${this.mapId}/init`));
    this.exists = init.val();
  }

  private setTitleWatchers() {
    const nameRef = ref(this.db, this.titlePath);
    onValue(nameRef, (snapshot) => {
      const data = snapshot.val();
      this.dataService.setTitle(data);
    });

    this.titleSubscription = this.dataService.titleObserver.subscribe(
      (x) => this.updateDB(this.titlePath, this.dataService.title),
      (err) => console.error('oopsie poopsie', err),
      () => console.warn('title observer finished')
    );
  }

  private setTicketWatchers() {
    const ticketRef = ref(this.db, this.ticketPath);
    onValue(ticketRef, (snapshot) => {
      const data = snapshot.val();
      this.dataService.ticketLookup = data ? data : {};
      this.dataService.ticketObserver.next();
    });

    this.ticketSubscription = this.dataService.ticketObserver.subscribe(
      (x) => this.updateDB(this.ticketPath, this.dataService.ticketLookup),
      (err) => console.error('oopsie poopsie', err),
      () => console.warn('title observer finished')
    );
  }

  private setGroupWatchers() {
    const groupRef = ref(this.db, this.groupPath);
    onValue(groupRef, (snapshot) => {
      const data = snapshot.val();
      this.dataService.groupLookup = data ? data : {};
      this.dataService.groupObserver.next();
    });

    this.groupSubscription = this.dataService.groupObserver.subscribe(
      (x) => this.updateDB(this.groupPath, this.dataService.groupLookup),
      (err) => console.error('oopsie poopsie', err),
      () => console.warn('title observer finished')
    );
  }

  private setDependencyWatchers() {
    const depRef = ref(this.db, this.dependencyPath);
    onValue(depRef, (snapshot) => {
      const data = snapshot.val();
      this.dataService.dependencyLookup = data ? data : [];
      this.dataService.dependencyObserver.next();
    });

    this.ticketSubscription = this.dataService.dependencyObserver.subscribe(
      (x) => this.updateDB(this.dependencyPath, this.dataService.dependencies),
      (err) => console.error('oopsie poopsie', err),
      () => console.warn('title observer finished')
    );
  }

  private setTagWatchers() {
    const depRef = ref(this.db, this.tagPath);
    onValue(depRef, (snapshot) => {
      const data = snapshot.val();
      this.dataService.tagLookup = data ? data : {};
      this.dataService.tagObserver.next();
    });

    this.tagSubscription = this.dataService.tagObserver.subscribe(
      (x) => this.updateDB(this.tagPath, this.dataService.tagLookup),
      (err) => console.error('oopsie poopsie', err),
      () => console.warn('title observer finished')
    );
  }

  private unsubscribeToObservers() {
    this.titleSubscription?.unsubscribe();
    this.ticketSubscription?.unsubscribe();
    this.groupSubscription?.unsubscribe();
    this.dependencySubscription?.unsubscribe();
    this.tagSubscription?.unsubscribe();
  }

  public async createNewMap() {
    while (true) {
      this.mapId = this.generateName();
      await this.checkExistence();
      if (!this.exists) {
        break;
      }
    }

    const updateFields = {};
    updateFields[`maps/${this.mapId}`] = {};
    updateFields[`maps/${this.mapId}`]['init'] = true;
    updateFields[`maps/${this.mapId}`]['title'] = this.dataService.title;

    update(ref(this.db), updateFields);
    this.router.navigateByUrl(`/${this.mapId}`);
  }

  private generateName(): string {
    const index1 = Math.ceil(
      ((Math.random() * 100000) % this.names.length) - 1
    );
    const index2 = Math.ceil(
      ((Math.random() * 100000) % this.names.length) - 1
    );

    const num1 = Math.ceil((Math.random() * 100000) % 9);
    const num2 = Math.ceil((Math.random() * 100000) % 9);
    const num3 = Math.ceil((Math.random() * 100000) % 9);

    return `${this.names[index1]}-${this.names[index2]}-${num1}${num2}${num3}`;
  }

  private updateDB(path: string, value: any) {
    const updateFields = {};
    updateFields[path] = value;
    update(ref(this.db), updateFields);
  }

  /* SHENANIGANS LANDIGANS */

  names = [
    'taco',
    'bike',
    'cheese',
    'apple',
    'corn',
    'dog',
    'cat',
    'tea',
    'burger',
    'piano',
    'cloth',
    'plant',
    'glue',
    'wrench',
    'horse',
    'fun',
    'cow',
    'basket',
    'mint',
    'flower',
    'water',
    'coffee',
    'oat',
    'paper',
    'shoe',
    'hat',
    'shirt',
    'milk',
    'child',
    'parent',
    'clock',
    'man',
    'woman',
    'thing',
    'time',
    'goose',
    'goat',
    'clown',
  ];
}
