import Typewriter from 'typewriter-effect'

export default function AnimatedTitle() {
  return (
    <h1 className="font-medium lg:text-6xl">
      <Typewriter
        options={{
          autoStart: true,
          loop: true,
          delay: 50,
        }}
        onInit={(typewriter) =>
          typewriter
            .typeString(
              'Welcome to <span style="color: #ea1e30;">MatchJob</span>'
            )
            .pauseFor(1500)
            .deleteAll()
            .start()
        }
      />
    </h1>
  )
}
