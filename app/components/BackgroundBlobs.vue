<template>
  <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div class="blob top-right" />
    <div class="blob bottom-left" />
    <div class="blob center" />
  </div>
</template>

<style scoped>
.blob {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.3;
  animation: float 20s infinite ease-in-out;
}

.top-right {
  background: rgb(192, 132, 252);
  top: -200px;
  right: -200px;
}

.bottom-left {
  background: rgb(147, 197, 253);
  bottom: -200px;
  left: -200px;
  animation-delay: 2s;
}

.center {
  background: rgb(249, 168, 212);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 4s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-40px, 40px) scale(0.9);
  }
}
</style>
