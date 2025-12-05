<template>
  <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div class="blob blob-purple" />
    <div class="blob blob-blue" />
    <div class="blob blob-pink" />
  </div>
</template>

<style>
.blob {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.3;
  will-change: transform;
}

.blob-purple {
  background: rgb(192, 132, 252);
  top: -200px;
  right: -200px;
  animation: float-1 20s infinite ease-in-out;
}

.blob-blue {
  background: rgb(147, 197, 253);
  bottom: -200px;
  left: -200px;
  animation: float-2 20s infinite ease-in-out;
  animation-delay: 2s;
}

.blob-pink {
  background: rgb(249, 168, 212);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float-3 20s infinite ease-in-out;
  animation-delay: 4s;
}

@keyframes float-1 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-40px, 40px) scale(0.9);
  }
}

@keyframes float-2 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(-30px, 50px) scale(1.05);
  }
  66% {
    transform: translate(40px, -30px) scale(0.95);
  }
}

@keyframes float-3 {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  33% {
    transform: translate(calc(-50% + 20px), calc(-50% - 30px)) scale(1.08);
  }
  66% {
    transform: translate(calc(-50% - 25px), calc(-50% + 35px)) scale(0.92);
  }
}

/* Dark mode optimization */
@media (prefers-color-scheme: dark) {
  .blob {
    opacity: 0.2;
    mix-blend-mode: soft-light;
  }
}
</style>