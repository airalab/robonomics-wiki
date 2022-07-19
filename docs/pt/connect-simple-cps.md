---
title: Connect the simplest CPS 
locale: 'pt' 
contributors: [ensrationis, akru]
translated: true
---

In this section we will build the simplest real cyber-physical system!

We will buy a "wink" from Arduino, e.g. make Arduino blink with its onboard led. The lesson is tested on Arduino Uno, but any other board with a led will do the job.

> The source code of this lesson is [here](https://github.com/airalab/robonomics_tutorials/tree/master/arduino_blink).

## Arduino

The firmware for the board is located in [arduino_blink/misc/arduino/arduino.ino](https://github.com/airalab/robonomics_tutorials/blob/master/arduino_blink/misc/arduino/arduino.ino). Use [Arduino IDE](https://www.arduino.cc/en/Main/Software) to load the code to your Arduino board.

In the code we subscribe for the ``/blink_led`` topic and set a callback. The type of the topic is ``Empty``, so the board waits until someone publishes to the topic and performs the LED blinking.

```
  #include <ros.h>
  #include <std_msgs/Empty.h>

  ros::NodeHandle  nh;

  void blink(int led, int mil) {

    digitalWrite(led, HIGH);
    delay(mil);
    digitalWrite(led, LOW);
    delay(mil);

  }

  void messageCb( const std_msgs::Empty& toggle_msg){
    blink(LED_BUILTIN, 500);
    blink(LED_BUILTIN, 500);
    blink(LED_BUILTIN, 500);
  }

  ros::Subscriber<std_msgs::Empty> sub("blink_led", &messageCb );

  void setup()
  {
    pinMode(LED_BUILTIN, OUTPUT);
    nh.initNode();
    nh.subscribe(sub);
  }

  void loop()
  {
    nh.spinOnce();
    delay(1);
  }
```


## AIRA client

> You can download the latest release from [here](https://github.com/airalab/aira/releases).

Set up the COM port forwarding. You should forward your `/dev/ttyUSB0` or `/dev/ttyACM0` port (depending on the system) to `COM1`. In the client `/dev/ttyS0` will represent the board. After this launch the virtual machine.

## ROS

When new liability is created it goes to `/liability/ready` topic. We have to remember the address and call `/liability/start` service to get the data from objective.

```
  def newliability(l):
    self.liability = l.address
    rospy.loginfo("Got new liability {}".format(self.liability))

    prefix = "/liability/eth_" + self.liability
    rospy.Subscriber(prefix + '/blink', Empty, self.blink)

    rospy.wait_for_service("/liability/start")
    rospy.ServiceProxy('/liability/start', StartLiability)(StartLiabilityRequest(address=self.liability))
  rospy.Subscriber("/liability/ready", Liability, newliability)
```

A message in the `/blink` topic come from the objective field. Have a look at [Basic usage](/docs/aira-basic-usage) page.

## AIRA

Connect to AIRA client via SSH as described [here](/docs/aira-connecting-via-ssh). All tutorials are pre-installed. To launch the ros package run the following command:

```
$ rosrun arduino_blink blink.py
```

Also we need to add a rosbag file to IPFS::

```
$ ipfs add rosbag/blink.bag
```

> Before the next step you should approve XRT tokens on the Factory.

On your host system build and launch an Dapp for the lesson:

```
$ git clone https://github.com/airalab/robonomics_tutorials/
$ cd robonomics_tutorials/arduino_blink_dapp
$ npm i && npm run dev
```

Open [http://localhost:8000/](http://localhost:8000/) and press "Demand" then "Offer" buttons. Wait until a new liability is created and you should see the board blinking. Congratulations on the first agent!
