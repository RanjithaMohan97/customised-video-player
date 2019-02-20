import React,{Component} from 'react';
import './App.css';
import PlayButtonIcon from '@material-ui/icons/PlayCircleFilledWhite';
import PauseButtonIcon from '@material-ui/icons/PauseCircleFilled';
import LinearProgress from '@material-ui/core/LinearProgress';
import VolumeOn from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';
import FullScreen from '@material-ui/icons/Fullscreen';
import FullScreenExit from '@material-ui/icons/FullscreenExit';
import Slider from '@material-ui/lab/Slider';

class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            action: "pause",
            completed: 0,
            volume: true,
            value: 1

        };
        this.playPause = this.playPause.bind(this);
        this.progress = this.progress.bind(this);
        this.muteVolume = this.muteVolume.bind(this);
        this.unmuteVolume = this.unmuteVolume.bind(this);
        //this.changeDuration = this.changeDuration.bind(this);
        this.enterFullScreen = this.enterFullScreen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.exitFullScreen = this.exitFullScreen.bind(this);

    }


    componentWillUnmount()
    {
        clearInterval(this.timer);
    }


    progress = () =>
    {
        var videosrc = document.getElementById("videoElement");
        var cursec = this.state.completed;
          console.log(videosrc.duration );
        if (videosrc.currentTime === videosrc.duration)
        {
            console.log("finished")
            this.setState(
            {
                completed: 0,
                action: "pause"
            })
        }
        else
        {
            this.setState({
                completed: Math.floor((100 / videosrc.duration) * videosrc.currentTime)
            })
        }
    }


    playPause(value)
    {
        var videosrc = document.getElementById("videoElement");
        var progress = document.getElementById("progressBar");

        this.setState(
        {
            action: value
        })
        console.log(this.state.action)
        if (value === "play")
        {
            console.log("video started playing");
            videosrc.play();
            this.timer = setInterval(this.progress, 1000);

        }
        else
        {
            console.log("video stoped playing");
            videosrc.pause();
            //this.timer = setInterval(this.progress,700);
        }
        progress.addEventListener('click', function(e)
        {
            console.log(this.offsetParent);
            console.log(this.offsetLeft);
            console.log(this.offsetWidth);
            console.log(e.pageX);
            var pos = (e.pageX - this.offsetLeft) / this.offsetWidth;
            console.log(pos);
            videosrc.currentTime = pos * videosrc.duration;
        });
    }


    muteVolume()
    {
        var videosrc = document.getElementById("videoElement");
        videosrc.volume = videosrc.muted;
        console.log(videosrc.volume);
        console.log()
        this.setState({
            volume: false
        })
    }


    unmuteVolume()
    {
        var videosrc = document.getElementById("videoElement");
        videosrc.volume = !videosrc.unmuted;
        this.setState({
            volume: true
        })
    }


    handleChange(event, value)
    {
        console.log(event);
        console.log(value);
        this.setState({
            value: value
        });
        document.getElementById("videoElement").volume = value;
    }


    enterFullScreen()
    {
        var videosrc = document.getElementById("videoElement");
        var progress = document.getElementById("progressBar");
        videosrc.classList.add("fullscreen");
        progress.classList.add("fullscreen");
        //document.getElementById("App").classList.add("fullscreen");

    }


    exitFullScreen()
    {
        var videosrc = document.getElementById("videoElement");
        var progress = document.getElementById("progressBar");
        videosrc.classList.remove("fullscreen");
        progress.classList.remove("fullscreen");

    }
  
  render() {
    return (
      <div className="App">
          <video id="videoElement">
              <source src={ require( "./devstories.webm")} type="video/webm" />
          </video>
          <div className="progress">
              <Slider id="progressBar" value={this.state.completed}/>
          </div>
          <div className="controls">
                {this.state.action==="pause"?
                <PlayButtonIcon id="a1" onClick={ ()=>this.playPause("play")} fontSize = "large"> </PlayButtonIcon>
                :
                <PauseButtonIcon onClick={ ()=>this.playPause("pause")} fontSize = "large"></PauseButtonIcon>
                }
                <FullScreen onClick={ this.enterFullScreen} fontSize="large"></FullScreen>
                <FullScreenExit onClick={ this.exitFullScreen} fontSize="large"></FullScreenExit>
                {this.state.volume===true?
                <VolumeOn onClick={ ()=>this.muteVolume()} fontSize = "large"></VolumeOn>
                :
                <VolumeOff onClick={ ()=>this.unmuteVolume()} fontSize = "large"></VolumeOff>
                }
                <Slider id="volumeChange" value={this.state.value} min={0} max={1} onChange={this.handleChange} fontSize="large" />
          </div>
      </div>
    );
  }
}

export default App;
//onClick = {e =>this.changeDuration(e)} />         <LinearProgress id = "lp" variant="determinate" value = {this.state.completed} />
