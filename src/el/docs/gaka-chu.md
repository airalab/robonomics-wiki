---
title: Εγκατάσταση και Εγκατάσταση Λογισμικού Gaka-Chu

contributors: [PaTara43]
---

https://www.youtube.com/watch?v=GxlYxaykqTU

**Σε αυτό το άρθρο θα προχωρήσουμε μέσα από ορισμένα βήματα εγκατάστασης και εκκίνησης για τη δημιουργία ενός ρομπότ ζωγράφου. Απαιτήσεις:**
- KUKA KR6 R900 sixx με KRC4 και SmartPad;
- Intel NUC με [ROS melodic](http://wiki.ros.org/melodic/Installation/Ubuntu) εγκατεστημένο;
- Τραπέζι, χρώμα, πινέλο, νερό.

## Εγκατάσταση Λογισμικού στο KRC4
Η διεπαφή EKI απαιτείται τόσο στο KRC4 όσο και στο NUC. Λεπτομερείς πληροφορίες για το πώς να το ρυθμίσετε στο KRC4 παρουσιάζονται [εδώ](https://github.com/AlexeiOvcharov/kuka_experimental/tree/a915bf4e932990379c84164713e7ae11a24a2a13/kuka_eki_hw_interface/krl). Εκκινήστε το στο χειριστήριο του ρομπότ.

## Εγκατάσταση Λογισμικού στο NUC
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
Μπορεί να χρειαστείτε κάποια αρχεία κεφαλίδων και βιβλιοθήκες για να λειτουργήσει σωστά. Κατεβάστε τα:
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
Μέχρι στιγμής, θα πρέπει να είστε σε θέση να εκκινήσετε τα σενάρια.. Αν κάτι πάει στραβά, δοκιμάστε κάποιο [πρόβλημα εύρεσης λύσης](https://github.com/airalab/robot_painter/issues)

## Γέμισμα σταθερών
Καταρχάς, το ρομπότ πρέπει να γνωρίζει τη θέση και τον προσανατολισμό του καμβά καθώς και τη θέση του βαζιού με την μπογιά. Όλα αυτά καθορίζονται στο `fake_painter_enviroment_tf/src/tf_broadcaster.cpp`. Ας το εξετάσουμε.
```
// Σταθερές επιπέδου
const double A = -0.0641;
const double B = 0.0214;
const double C = 0.9977;
const double D = -0.2198;

// Μετασχηματισμός καμβά
const double px = 0.52;
const double py = -0.24;
const double qx = -0.011;
const double qy = -0.032;
const double qz = 0.0;
const double qw = 0.999;
```
Αυτές είναι οι σταθερές της εξίσωσης του επιπέδου που καθορίζουν τη θέση του καμβά στον τρισδιάστατο χώρο. Πρέπει να ληφθούν κατά τη διάρκεια ενός διαδικασίας βαθμονόμησης που περιγράφεται παρακάτω. Στη συνέχεια πηγαίνουμε στη μπογιά.
```
colorTransform.transform.translation.x = 0.5;
colorTransform.transform.translation.y = 0.2;
colorTransform.transform.translation.z = 0.258;
```
Αυτές είναι οι συντεταγμένες του βαζιού με τη μπογιά. Μπορεί επίσης να καθοριστούν κατά τη βαθμονόμηση. Το μέγεθος του καμβά καθορίζεται στο
```
canvas.width = 0.5;
canvas.height = 0.4;
```
Πολλές ακόμα σημαντικές σταθερές αποθηκεύονται στο `local_task_planner/src/Drawing.cpp`:
```
const double COLOR_BOTLE_HEIGHT = 0.06;
const double COLOR_HEIGHT = 0.045;
const double HEIGHT_OFFSET = COLOR_BOTLE_HEIGHT - COLOR_HEIGHT + 0.02;
const double BRUSH_HEIGHT = 0.01;
const double BRUSH_WIDTH = 0.01;
```
Τα ονόματά τους λένε τα πάντα, οπότε συμπληρώστε τα ανάλογα με την κατάσταση.

## Βαθμονόμηση του Gaka-Chu
Η ίδια η διαδικασία βαθμονόμησης είναι αρκετά απλή.

1) Ξεκινήστε τη διεπαφή EKI στο KRC4:

Συνδεθείτε στη λειτουργία 'AUT', ενεργοποιήστε τους οδηγούς και εκκινήστε το σενάριο `eki_hw_interface`

2) Ξεκινήστε τη διεπαφή EKI στο NUC
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```
Θα πρέπει να εμφανίζει ατελείωτα αρχεία καταγραφής.

3) Ξεκινήστε το RViz
```
roΕκτελέστε το `roslaunch kuka_moveit_config demo.launch`
```
Θα πρέπει να δείτε το παρακάτω:

{% roboWikiPicture {src:"docs/kuka-real/kuka_rviz.png", alt:"KUKA in RViz"} %}{% endroboWikiPicture %}

Δοκιμάστε να μετακινήσετε τον τερματικό εξοπλισμό και να κάνετε κλικ στο 'Plan and Execute'. Ο ρομπότ θα πρέπει να μετακινηθεί. Στο SmartPad πηγαίνετε σε **Display -> Actual position** και παρατηρήστε τις συντεταγμένες του τερματικού εξοπλισμού. Τοποθετήστε έναν καμβά οριζόντια στη βάση του ρομπότ. Συνδέστε ένα πινέλο στον βάτο του πινέλου και με προσοχή μετακινήστε τον μέχρι να ακουμπήσει ελάχιστα τον καμβά. Σε αυτή τη θέση, αποθηκεύστε τις συντεταγμένες του τερματικού εξοπλισμού. Επαναλάβετε 12-15 φορές. Αποθηκεύστε επίσης τις συντεταγμένες του κέντρου του καμβά και του βαζιού με την μπογιά.
Όταν έχετε ένα σύνολο συντεταγμένων, χρησιμοποιήστε [αυτά](https://github.com/nakata5321/Matlab_scripts_gaka-chu) τα scripts Matlab για την επίλυση των λείποντων σταθερών και του κουατερνίον. Επικολλήστε τα. Ανακατασκευάστε τον χώρο εργασίας σας με
```
cd ~/catkin_workspace
rm -rf build logs devel
catkin build
```

## Δοκιμή της βαθμονόμησης Gaka-Chu
Όταν είναι βαθμονομημένος, ο Gaka-Chu πρέπει να δοκιμαστεί με το να σχεδιάζει τα όρια του καμβά. Για να τον κάνετε να το κάνει, εκτελέστε κάθε ένα σε νέο τερματικό:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
roslaunch kuka_moveit_config demo.launch
rosrun fake_painter_enviroment_tf tf_broadcaster
rosrun local_task_planner draw_workspace
```
Μετά από αυτό, θα πρέπει να δείτε ένα περίγραμμα καμβά στο RViz:

{% roboWikiPicture {src:"docs/kuka-real/kuka_rviz_canvas.png", alt:"KUKA in RViz canvas"} %}{% endroboWikiPicture %}

Στο τερματικό πατήστε "S" για να πραγματοποιήσετε τη δοκιμή. Ο τερματικός εξοπλισμός του ρομπότ θα πρέπει να μετακινηθεί ακριβώς πάνω από τα όρια του καμβά και το πινέλο θα πρέπει να ακουμπά απαλά τον καμβά κατά τη διάρκεια ολόκληρης της κίνησης. Αν δεν συμβαίνει έτσι, δοκιμάστε να ξαναβαθμονίσετε. Αν το μοντέλο του καμβά είναι περιστραμμένο λάθος, μπορείτε να το περιστρέψετε αλλάζοντας το κουατερνίον στο Matlab.

## Δημιουργία τέχνης
Χρειάζεστε 6 βασικά modules για να λειτουργήσει το σύστημα:
- Διεπαφή EKI;
- MOVEit + RViz;
- Μετάδοση πλαισίων περιβάλλοντος;
- Υπηρεσία μετατροπής εικόνας;
- Μονάδα σχεδίασης τροχιών;
- Εκκίνησης εντολή.

Ας τα εκκινήσουμε ένα-ένα.

### Διεπαφή Eki
Στο KRC4 εκκινήστε το `eki_hw_interface`, στο NΣε ένα νέο τερματικό, εκτελέστε:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```

### RViz και MOVEit
Χρειάζεστε ένα σχεδιαστή και μια προσομοίωση. Εκκινήστε τα με:
```
roslaunch kuka_moveit_config demo.launch
```

### Περιβάλλον
Πείτε στο ρομπότ πού βρίσκονται το βαζάκι με την μπογιά και το καμβά. Σημειώστε ότι δεν είναι απαραίτητο να εκκινήσετε τον κόμβο `draw workspace`, το `tf_broadcaster` μοιράζεται το μέγεθος του καμβά. Απλώς δεν το εμφανίζει στο RViz.
```
rosrun fake_painter_enviroment_tf tf_broadcaster
```

### Επεξεργαστής εικόνων
Όλες οι εισερχόμενες εικόνες πρέπει να επεξεργαστούν. Εκκινήστε την υπηρεσία.
```
rosrun picture_preprocessing TextConverter.py
```
Όταν λάβει την κλήση, επεξεργάζεται μια εικόνα με ένα HP φίλτρο και δημιουργεί ένα αρχείο rosbag με τροχιές.

### Σχεδιαστής τροχιών
Το κυριότερο σενάριο εδώ είναι ο ίδιος ο σχεδιαστής τροχιών. Αναμένει την εικόνα, καλεί την υπηρεσία TextConverter και σχεδιάζει τον πίνακα.
```
rosrun local_task_planner trajectory_drawing
```

## Στείλτε στο ρομπότ μια εικόνα για να σχεδιάσει
Το ρομπότ ακούει ένα συγκεκριμένο ROS-θέμα όπου πρέπει να δώσετε τη διαδρομή προς μια επιθυμητή εικόνα. Η εικόνα πρέπει να είναι τετράγωνη (πλάτος ίσο με ύψος) και να αποτελείται από γραμμές. Στείλτε τη διαδρομή:
```
rostopic pub /run std_msgs/String "data: '<path_to_picture>'"
```
Μετά από αυτό, εμφανίζονται δύο παράθυρα που δείχνουν τις περίγραμμα και τις διαδρομές. Κλείστε τα και δείτε τον Gaka-Chu να ζωγραφίζει. Προσέξτε την ασφάλεια και είστε πάντα έτοιμοι να πατήσετε το κουμπί έκτακτης ανάγκης.
Όταν ο Gaka-Chu ολοκληρώσει το έργο του, μπορείτε να στείλετε μια άλλη διαδρομή για εικόνα και ο ζωγράφος επαναλαμβάνει ολόκληρη τη διαδικασία.