
const socket =io('/')
const videoGrid = document.getElementById('video-grid')
console.log(videoGrid)

//create video element
const myVideo = document.createElement('video')
myVideo.muted =true


const addVideoStream =(video,stream)=>{
  video.srcObject =stream
  video.addEventListener('loadedmetadata',()=>{
    video.play()
  })
  videoGrid.append(video)
}

let videoStream;

navigator.mediaDevices.getUserMedia({
  video:true,
  audio:true
}).then(stream=>{
        videoStream = stream
        addVideoStream(myVideo,stream)

        peer.on('call',call=>{
          call.answer(stream)
          const video = document.createElement('video')
          call.on('stream',userVideoStream=>{
            addVideoStream(video,userVideoStream)
          })
        })

        socket.on('user-connected',(userId)=>{
          connectTonewUser(userId,stream)
        })


})

var peer = new Peer(undefined,{
  path:'/peerjs',
  host:'/',
  port:'3030'

})


peer.on('open',id=>{
  socket.emit('join-room',ROOM_ID,id)
})


// socket.on('user-connected',(userId)=>{
//   connectTonewUser(userId,stream)
// })


const connectTonewUser =(userId,stream)=>{
  console.log(userId)
  const call = peer.call(userId,stream)
  const video = document.createElement('video')
  call.on('stream',userVideoStream=>{
    addVideoStream(video,userVideoStream)
  })
}

