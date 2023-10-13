---
title: Ρύθμιση και εγκατάσταση λογισμικού Gaka-Chu

contributors: [PaTara43]
---

https://www.youtube.com/watch?v=GxlYxaykqTU

**Σε αυτό το άρθρο θα περάσουμε μερικά βήματα εγκατάστασης και εκκίνησης για να ρυθμίσουμε ένα ρομπότ-ζωγράφο. Απαιτήσεις:**
- KUKA KR6 R900 sixx με KRC4 και SmartPad·
- Intel NUC με εγκατεστημένο [ROS melodic](http://wiki.ros.org/melodic/Εγκατάστασηation/Ubuntu)·
- Τραπέζι, χρώμα, πινέλο, νερό. 

## Εγκατάσταση λογισμικού στο KRC4
Απαιτείται διεπαφή EKI και στα δύο, KRC4 και NUC. Λεπτομερείς πληροφορίες για το πώς να το ρυθμίσετε στο KRC4 παρουσιάζονται [εδώ](https://github.com/AlexeiOvcharov/kuka_experimental/tree/a915bf4e932990379c84164713e7ae11a24a2a13/kuka_eki_hw_interface/krl). Εκκινήστε το στον ελεγκτή του ρομπότ.

## Εγκατάσταση λογισμικού στο NUC
Δημιουργήστε έναν χώρο εργασίας catkin:
```
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin build
```
Λήψη πακέτων ROS. Όλα τα σενάρια αποθηκεύονται [εδώ](https://github.com/airalab/robot_painter/tree/test_branch). Κλωνοποιήστε το αποθετήριο:
```
cd src
git clone --branch test_branch https://github.com/airalab/robot_painter
cd robot_painter
rm -rf scenes
mv * ../
cd ..
rmdir robot_painter
```
Μπορεί να χρειαστείτε μερικά αρχεία κεφαλίδων και βιβλιοθήκες για να λειτουργήσει σωστά. Κατεβάστε τα:
```
cd ~
git clone https://github.com/PaTara43/kuka_moveit_webots
cd kuka_moveit_webots
sudo mv -r headers/* usr/include/c++/7/
sudo mv libs/* usr/local/lib/
cd ~
svn checkout https://github.com/PX4/Matrix/trunk/matrix
mv matrix -r /usr/include/c++/7/
sudo apt-get install ros-melodic-brics-actuator
cd ~/catkin_ws
catkin build
```
Προσθέστε την εντολή πηγής στο αρχείο `.bashrc`:
```
echo “source ~/catkin_ws/devel/setup.bash” >> ~/.bashrc
source ~/.bashrc
```
Μέχρι στιγμής, θα πρέπει να μπορείτε να κκινήσετε τα σενάρια. Εάν κάτι πάει στραβά, δοκιμάστε μερικές [διορθώσεις προβλημάτων](https://github.com/airalab/robot_painter/issues)

## Συμπλήρωση σταθερών
Καταρχάς, το ρομπότ πρέπει να γνωρίζει τη θέση και τον προσανατολισμό του καμβά, καθώς και τη θέση του κουτιού με το χρώμα. Όλα αυτά καθορίζονται στο `fake_painter_enviroment_tf/src/tf_broadcaster.cpp`. Ας το ρίξουμε μια ματιά.
```
// Plane constants
const double A = -0.0641;
const double B = 0.0214;
const double C = 0.9977;
const double D = -0.2198;

// Canvas transform
const double px = 0.52;
const double py = -0.24;
const double qx = -0.011;
const double qy = -0.032;
const double qz = 0.0;
const double qw = 0.999;
```
Αυτές είναι οι σταθερές εξισώσεων επιπέδου που καθορίζουν τη θέση του καμβά στον 3D χώρο. Πρέπει να ληφθούν κατά τη διάρκεια ενός διαδικασίας βαθμονόμησης που περιγράφεται παρακάτω. Στη συνέχεια ακολουθεί το χρώμα.
```
colorTransform.transform.translation.x = 0.5;
colorTransform.transform.translation.y = 0.2;
colorTransform.transform.translation.z = 0.258;
```
Αυτές είναι οι συντεταγμένες του κουτιού με το χρώμα. Μπορούν επίσης να καθοριστούν κατά τη βαθμονόμηση. Οι διαστάσεις του καμβά καθορίζονται στο
```
canvas.width = 0.5;
canvas.height = 0.4;
```
Αποθηκεύονται και άλλες σημαντικές σταερές στο `local_task_planner/src/Drawing.cpp`:
```
const double COLOR_BOTLE_HEIGHT = 0.06;
const double COLOR_HEIGHT = 0.045;
const double HEIGHT_OFFSET = COLOR_BOTLE_HEIGHT - COLOR_HEIGHT + 0.02;
const double BRUSH_HEIGHT = 0.01;
const double BRUSH_WIDTH = 0.01;
```
Τα ονόματά τους λένε όλα, οπότε συμπληρώστε τα ανάλογα με την κατάσταση.

## Βαθμονόμηση Gaka-Chu
Η ίδια η διαδικασία βαθμονόμησης είναι αρκετά απλή.

1) Εκκίνηση διεπαφής EKI στο KRC4:

Συνδεθείτε σε λειτουργία 'AUT', ενεργοποιήστε τους οδηγούς και εκκινήστε το σενάριο `eki_hw_interface`

2) Εκκίνηση διεπαφής EKI στο NUC
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```
Θα πρέπει να εμφανίζει ατελείωτα αρχεία καταγραφής.

3) Εκκίνηση RViz
```
roslaunch kuka_moveit_config demo.launch
```
Θα πρέπει να δείτε το εξής:

![KUKA in RViz](../images/kuka-real/kuka_rviz.png "KUKA in RViz")

Δοκιμάστε να μετακινήσετε τον τερματικό εκτελεστή και κάντε κλικ στο 'Σχεδιασμός και Εκτέλεση'. Ο ρομπότ θα πρέπει να κινηθεί. Στο SmartPad πηγαίνετε σε **Display -> Actual position** και παρατηρήστε τις συντεταγμένες του τερματικού εκτελεστή. Τοποθετήστε ένα καμβά οριζόντια στη βάση του ρομπότ. Συνδέστε ένα πινέλο στον κάτοχο πινέλου και μετακινήστε το προσεκτικά μέχρι να ακουμπήσει ελάχιστα τον καμβά. Σε αυτή τη θέση, αποθηκεύστε τις συντεταγμένες του τερματικού εκτελεστή. Επαναλάβετε 12-15 φορές. Επίσης, αποθηκεύστε τις συντεταγμένες του κέντρου του καμβά και του κουτιού με την μπογιά.
Όταν έχετε ένα σύνολο συντεταγμένων, χρησιμοποιήστε [αυτά](https://github.com/nakata5321/Matlab_scripts_gaka-chu) τα Matlab scripts για να επιλύσετε τις λείπουσες σταθερές και το quaternion. Επικολλήστε τα. Ανακατασκευάστε τον χώρο εργασίας σας με
```
cd ~/catkin_workspace
rm -rf build logs devel
catkin build
```

## Δοκιμή της βαθμονόμησης Gaka-Chu
Όταν έχει βαθμονομηθεί, η Gaka-Chu πρέπει να δοκιμαστεί σχεδιάζοντας τα όρια του καμβά. Για να τον κάνετε να το κάνει, εκτελέστε τα παρακάτω σε νέο τερματικό:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
roslaunch kuka_moveit_config demo.launch
rosrun fake_painter_enviroment_tf tf_broadcaster
rosrun local_task_planner draw_workspace
```
Μετά από αυτό, θα πρέπει να δείτε ένα περίγραμμα του καμβά στο RViz:

![KUKA in RViz canvas](../images/kuka-real/kuka_rviz_canvas.png "KUKA in RViz canvas")

Πατήστε "S" στο τερματικό για να πραγματοποιήσετε τη δοκιμή. Ο τερματικός εκτελεστής του ρομπότ θα πρέπει να μετακινηθεί ακριβώς πάνω από τα όρια του καμβά και το πινέλο θα πρέπει να ακουμπάει απαλά τον καμβά κατά τη διάρκεια ολόκληρης της κίνησης. Αν δεν συμβαίνει αυτό, δοκιμάστε να ξαναβαθμονομήσετε. Αν το μοντέλο του καμβά είναι περιστραμμένο λάθος, μπορείτε να το περιστρέψετε αλλάζοντας το quaternion στο Matlab.

## Δημιουργία τέχνης
Χρειάζεστε 6 βασικά ενότητες για να λειτουργήσει όλο αυτό:
- Διεπαφή EKI;
- MOVEit + RViz;
- Μετάδοση πλαισίων περιβάλλοντος;
- Υπηρεσία μετατροπής εικόνας;
- Ενότητα σχεδίασης τροχιών;
- Εκκίνηση ενεργοποιητή.

Ας τις εκκινήσουμε μία-μία.

### Διεπαφή Eki
Στο KRC4 εκκινήστε το `eki_hw_interface`, στο NUC σε ένα νέο τερματικό κάντε:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```

### RViz και MOVEit
Χρειάζεστε έναν σχεδιαστή και μια προσομοίωση. Εκκινήστε τα με
```
roslaunch kuka_moveit_config demo.launch
```

### Περιβάλλον
Πείτε στο ρομπότ πού βρίσκονται το κουτί με τη μπογιά και ο καμβάς. Σημειώστε ότι δεν είναι απαραίτητο να εκκινήσετε τον κόμβο `draw workspace`, ο `tf_broadcaster` μοιράζεται το μέγεθος του καμβά. Απλώς δεν το εμφανίζει στο RViz.
```
rosrun fake_painter_enviroment_tf tf_broadcaster
```

### Επεξεργαστής εικόνων
Όλες οι εισερχόμενες εικόνες πρέπει να επεξεργαστούν. Εκκινήστε την υπηρεσία.
```
rosrun picture_preprocessing TextConverter.py
```
Όταν λαμβάνει την κλήση, επεξεργάζεται μια εικόνα με ένα φίλτρο HP και δημιουργεί ένα αρχείο rosbag με τις τροχιές.

### Ενότητα σχεδίασης τροχιών
Το κυριότερο σενάριο εδώ είναι ο ίδιος ο σχεδιασής τροχιών. Αναμένει την εικόνα, καλεί την υπηρεσία TextConverter και σχεδιάζει τη ζωγραφική.
```
rosrun local_task_planner trajectory_drawing
```

## Στείλτε στο ρομπότ μια εικόνα για να σχεδιάσει
Το ρομπότ ακούει ένα συγκεκριμένο ROS-θέμα όπου πρέπει να περάσετε τη διαδρομή προς μια επιθυμητή εικόνα. Η εικόνα πρέπει να είναι τετράγωνη (πλάτος ίσο με ύψος) και να αποτελείται από γραμμές. Στείλτε τη διαδρομή:
```
rostopic pub /run std_msgs/String "data: '<path_to_picture>'"
```
Μετά από αυτό, εμφανίζονται δύο παράθυρα που δείχνουν τα περίγραμματα και τις τροχιές. Κλείστε τα και δείτε τον Gaka-Chu να σχεδιάζει. Να είστε προσεκτικοί για την ασφάλεια και να είστε πάντα έτοιμοι να πατήσετε το κουμπί έκτακτης ανάγκης.
Όταν ο Gaka-Chu τελειώσει την τέχνη του, μπορείτε να στείλετε μια άλλη διαδρομή για εικόνα και ο ζωγράφος επαναλαμβάνει ολόκληρη τη διαδικασία.
