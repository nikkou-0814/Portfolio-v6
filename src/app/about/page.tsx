'use client';

const About = () => {
  return (
    <main className="min-h-screen">
      <section className="flex flex-col items-center justify-center min-h-screen p-8 space-y-8 max-w-4xl mx-auto">
        <div className="space-y-4 text-center mt-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent p-2">
            About Me
          </h1>
        </div>

        <div className="space-y-8 text-gray-700 dark:text-gray-400 leading-relaxed max-w-2xl">
          <div className="space-y-4">
            <p>
              Hi there! I’m a student from Japan who is passionate about web design and application development.
              Recently, I’ve developed a strong interest in earthquakes and disaster prevention.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              My Start in Programming
            </h3>
            <p>
              When I was in 4th grade, I discovered programming through a platform called 
              <a
                href="https://scratch.mit.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 underline"
              >
                Scratch
              </a>.
              I learned the basics by creating games and apps there, which laid the foundation for my later projects, including earthquake-related development.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              My Challenge in Web Design
            </h3>
            <p>
              My curiosity about programming led me to start creating websites with HTML.
              Initially, my designs weren’t great, but by studying other sites for inspiration, I gradually honed my skills.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              Discovering Earthquakes
            </h3>
            <p>
              My interest in earthquakes began with the Noto Peninsula Earthquake. 
              That day, I was at my mother’s family home preparing dinner when the house suddenly shook violently, and emergency alerts blared.
            </p>
            <p>
              When I opened the emergency earthquake alert software, 
              <a
                href="https://jquake.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 underline"
              >
                JQuake
              </a>, 
              it displayed &quot;Maximum intensity 7.&quot; This experience significantly deepened my fascination with earthquake observation.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              Developing Earthquake Information Tools
            </h3>
            <p>
              My first earthquake-related tool was &quot;EarthSaidBOT.&quot; 
              While it had many shortcomings due to my inexperience in design and implementation, I have improved it over time by gaining more experience.
            </p>
            <p>
              Currently, I’m running a relay server that aggregates data from multiple sources, 
              working to enhance the accuracy and stability of earthquake information delivery. 
              This allows me to provide timely and reliable updates.
            </p>
            <p className="text-sm text-gray-500">
              Note: This is operated within the scope of personal use in compliance with 
              <a
                href="https://dmdata.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 underline"
              >
                DM-D.S.S
              </a>&apos;s guidelines.
            </p>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg italic border border-purple-300 dark:border-purple-800">
            <p>That earthquake profoundly changed the way I view earthquakes.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;