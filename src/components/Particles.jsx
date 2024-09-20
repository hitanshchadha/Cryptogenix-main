import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                // Customize particle options here
                particles: {
                    number: {
                      value: 100
                    },
                    color: {
                      value: "#ffffff"
                    },
                    links: {
                      enable: true,
                      distance: 200
                    },
                    shape: {
                      type: "circle"
                    },
                    opacity: {
                      value: 0.5
                    },
                    size: {
                      value: {
                        min: 4,
                        max: 6
                      }
                    },
                    move: {
                      enable: true,
                      speed: 4
                    }
                  },
                  background: {
                    color: "#000000"
                  },
                  poisson: {
                    enable: true
                  },
                  fullScreen: {
                    enable: true,
                    zIndex: -1 // or any value is good for you, if you use -1 set `interactivity.detectsOn` to `"window"` if you need mouse interactions
                  },

            }}
        />
    );
};

export default ParticlesBackground;