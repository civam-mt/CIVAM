import { BehaviorSubject, Observable } from 'rxjs';
import { Track } from '../../model/track.model';
export declare class AudioPlayerService {
    tracks: Track[];
    playlistSubject$: BehaviorSubject<Track[]>;
    currentTrack: Track;
    currentTrackSubject$: BehaviorSubject<Track>;
    currentTime: any;
    currentTimeSubject$: BehaviorSubject<any>;
    setPlaylist(tracks: Track[]): void;
    getPlaylist(): Observable<Track[]>;
    setCurrentTrack(currentTrack: Track): void;
    getCurrentTrack(): Observable<Track>;
    setCurrentTime(currentTime: any): void;
    getCurrentTime(): Observable<any>;
}
