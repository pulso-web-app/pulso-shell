import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  velocityX: number;
  velocityY: number;
  targetX: number;
  targetY: number;
  targetAge: number;
  opacity: number;
}

@Component({
  selector: 'pulso-shell-floating-particles',
  imports: [],
  templateUrl: './floating-particles.component.html',
  styleUrl: './floating-particles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingParticlesComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() count = 48;
  @Input() speed = 0.55;

  readonly particles: Particle[] = [];

  @ViewChildren('particle')
  private readonly particleElements!: QueryList<
    ElementRef<HTMLSpanElement>
  >;

  private animationFrame = 0;
  private previousTime = 0;
  private pointerX = -1000;
  private pointerY = -1000;

  ngOnInit(): void {
    this.createParticles();
  }

  ngAfterViewInit(): void {
    this.animationFrame = requestAnimationFrame((time) => {
      this.previousTime = time;
      this.animate(time);
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrame);
  }

  @HostListener('pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    const bounds = this.getBounds();
    this.pointerX = event.clientX - bounds.left;
    this.pointerY = event.clientY - bounds.top;
  }

  @HostListener('pointerleave')
  onPointerLeave(): void {
    this.pointerX = -1000;
    this.pointerY = -1000;
  }

  private createParticles(): void {
    for (let index = 0; index < this.count; index += 1) {
      const particle = {
        id: index,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.25 + Math.random() * 0.85,
        velocityX: (Math.random() - 0.5) * 0.018,
        velocityY: (Math.random() - 0.5) * 0.018,
        targetX: Math.random() * 100,
        targetY: Math.random() * 100,
        targetAge: Math.random() * 5000,
        opacity: 0.18 + Math.random() * 0.45,
      };

      this.particles.push(particle);
    }
  }

  private animate(time: number): void {
    const elapsed = Math.min(time - this.previousTime, 32);
    const bounds = this.getBounds();
    const elements = this.particleElements.toArray();

    this.particles.forEach((particle, index) => {
      const element = elements[index]?.nativeElement;

      if (!element) {
        return;
      }

      this.updateParticle(particle, elapsed, bounds.width, bounds.height);
      element.style.left = `${particle.x}%`;
      element.style.top = `${particle.y}%`;
      element.style.opacity = `${particle.opacity}`;
    });

    this.previousTime = time;
    this.animationFrame = requestAnimationFrame((nextTime) =>
      this.animate(nextTime),
    );
  }

  private updateParticle(
    particle: Particle,
    elapsed: number,
    width: number,
    height: number,
  ): void {
    const milliseconds = elapsed;
    const movementScale = Math.max(this.speed, 0);
    particle.targetAge -= milliseconds;

    if (particle.targetAge <= 0) {
      particle.targetX = Math.random() * 100;
      particle.targetY = Math.random() * 100;
      particle.targetAge = 3500 + Math.random() * 7000;
    }

    const directionX = particle.targetX - particle.x;
    const directionY = particle.targetY - particle.y;
    const targetDistance = Math.hypot(directionX, directionY) || 1;
    const acceleration = 0.000035 * elapsed * movementScale;

    particle.velocityX += (directionX / targetDistance) * acceleration;
    particle.velocityY += (directionY / targetDistance) * acceleration;

    const particleX = (particle.x / 100) * width;
    const particleY = (particle.y / 100) * height;
    const distanceX = particleX - this.pointerX;
    const distanceY = particleY - this.pointerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < 220) {
      const force = (220 - distance) / 220;
      const push = 0.00012 * force * elapsed * movementScale;
      particle.velocityX += (distanceX / (distance || 1)) * push;
      particle.velocityY += (distanceY / (distance || 1)) * push;
    }

    particle.velocityX *= 0.998;
    particle.velocityY *= 0.998;
    particle.x += particle.velocityX * elapsed * movementScale;
    particle.y += particle.velocityY * elapsed * movementScale;

    if (particle.x < -2) particle.x = 102;
    if (particle.x > 102) particle.x = -2;
    if (particle.y < -2) particle.y = 102;
    if (particle.y > 102) particle.y = -2;
  }

  private getBounds(): DOMRect {
    return (this.particleElements.first?.nativeElement.parentElement
      ?.parentElement as HTMLElement | undefined)?.getBoundingClientRect()
      ?? new DOMRect();
  }
}
