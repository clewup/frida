'use client'

import {useEffect} from "react";
import { Music as MusicIcon} from 'react-feather'

const MusicPlayer = () => {
    useEffect(() => {
        const audioPlayer = document.getElementById('music-player') as HTMLAudioElement;
        audioPlayer.volume = 0.2
        audioPlayer.autoplay = true;
    }, []);

    return (
        <div>
            <audio id="music-player" src="/Dangerous.mp3" className="w-full">
                Your browser does not support the audio element.
            </audio>
            <div className="flex items-center justify-center">
                <button
                    onClick={() => {
                        const audioPlayer = document.getElementById('music-player') as HTMLAudioElement;
                        audioPlayer?.paused ? audioPlayer.play() : audioPlayer?.pause();
                    }}
                    className="btn btn-ghost btn-lg"
                >
                    <MusicIcon size={30}/>
                </button>
            </div>
        </div>
    );
};

export default MusicPlayer;