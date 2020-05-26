const INTERVAL_SPEED = 20,
      INTERVAL_TIME = 2000,
      MT_INTERVAL_TIME = 1500;

let Vehicle = function (color, engine) {
    this.color = color;
    this.engine = engine;
    this.maxSpeed = 70;
    this.maxDriveSpeed = 0;
    this.name = 'Vehicle';

    this.getInfo = () => {
        return {
            color: this.color,
            engine: this.engine,
            maxSpeed: this.maxSpeed
        };
    };

    this.upgradeEngine = (newEngine, maxSpeed) => {
      this.engine = newEngine;
      this.maxSpeed = maxSpeed;
    };

    this.drive = () => {
        
        if (!this.maxDriveSpeed) {
            this.currentSpeed = 0;
            this.handlerNum = setInterval(() => {
                this.currentSpeed += INTERVAL_SPEED;
                this.maxDriveSpeed = this.currentSpeed;
                
                if (this.currentSpeed > this.maxSpeed) {
                    console.log(`speed is too high, SLOW DOWN!`);
                }
                console.log(this.currentSpeed);
            }, INTERVAL_TIME);
        } else {
            console.log(`Already moving`);
        }
    };

    this.stop = () => {

        if (!(this.maxDriveSpeed - this.currentSpeed)) {
            clearInterval(this.handlerNum);

            this.handlerNum = setInterval(() => {
                this.currentSpeed -= INTERVAL_SPEED;
                console.log(this.currentSpeed);

                if (!this.currentSpeed) {
                    console.log(`${this.name} is stopped. Maximum speed during the drive was: ${this.maxDriveSpeed}`);
                    clearInterval(this.handlerNum);
                    this.maxDriveSpeed = 0;
                }
            }, MT_INTERVAL_TIME);
        } else {
            console.log('Already slows down');
        }
    }
};

function Car (model, color, engine) {
    this.__proto__ = new Vehicle(color, engine);
    this.__proto__.maxSpeed = 80;
    this.__proto__.name = 'Car';
    this.model = model;
    
    this.getInfo = () => {
        return {
            color: this.color,
            engine: this.engine,
            maxSpeed: this.maxSpeed,
            model: this.model
        }
    }
}

function Motocycle (model, color, engine) {
    this.__proto__ = new Vehicle(color, engine);
    this.__proto__.maxSpeed = 90;
    this.model = model;
    
    this.getInfo = () => {
        return {
            color: this.color,
            engine: this.engine,
            maxSpeed: this.maxSpeed,
            model: this.model
        }
    }
}