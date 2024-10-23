---
title: حول Robonomics ROS 2 Wrapper
contributors: [Fingerling42]
tools:   
  - أوبونتو 22.04.4
    https://releases.ubuntu.com/jammy/
  - ROS 2 Humble
    https://docs.ros.org/en/humble/Installation.html
  - IPFS Kubo 0.26.0
    https://docs.ipfs.tech/install/command-line/
  - Python 3.10.12
    https://www.python.org/downloads/
---

**في هذه المقالة، ستتعرف على حزمة Robonomics ROS 2 Wrapper، التي تتيح لك استخدام جميع ميزات سلسلة الكتل Robonomics لأي روبوت متوافق مع ROS 2.**

فكرة الحزمة هي لف الواجهة البرمجية لسلسلة الكتل Robonomics المقدمة من خلال [robonomics-interface](https://github.com/airalab/robonomics-interface) في عقدات ROS 2. الهدف هو توفير وسيلة ملائمة لمطوري ROS 2 لدمج روبوتاتهم أو أجهزتهم مع ميزات السلسلة الفرعية. المنطق وراء دمج جهاز روبوتي هو إنشاء عنوان فريد له في سلسلة الكتل Robonomics، الذي يُستخدم للتحكم في الجهاز أو استقبال بيانات الاستشعار الخاصة به.

تتضمن الميزات المتاحة:

* **وظيفة الإطلاق** — تشغيل جهاز لتنفيذ أي أمر مع مجموعة محددة من المعلمات الممررة كسلسلة نصية أو ملف.
* **وظيفة تسجيل البيانات** — نشر بيانات الجهازتلميتري بشكل تجريدي إلى باراشين.
* **استخدام اشتراك Robonomics** — القدرة على إرسال المعاملات دون رسوم.
* **تخزين الملفات الآمن** — لتعبئة وفك تشفير البيانات، يتم استخدام [نظام ملفات الإنتربلانتاري](https://ipfs.tech/)، الذي يسمح بالوصول إلى الملفات من خلال تعريفها الفريد. لتسهيل استخدام IPFS، تم تضمين دعم [Pinata](https://www.pinata.cloud/)، الذي يسمح بتثبيت ملفات IPFS للتنزيل السريع.
* **تشفير وفك تشفير الملفات** — حماية الملفات بتشفير المفتاح العام.

حاليًا، يتوفر الغلاف في [تنفيذ Python](https://github.com/airalab/robonomics-ros2/).

## هندسة الغلاف

من الناحية المعمارية، يتكون الغلاف من عقد عامل (مع المواضيع والخدمات اللازمة) وفئة عقد أساسية يمكن استخدامها لروبوتاتك الخاصة.

{% roboWikiPicture {src:"docs/robotics/robonomics-ros2-wrapper.png", alt:"هندسة غلاف ROS 2"} %}{% endroboWikiPicture %}

* `robonomics_ros2_pubsub` — عقد فريد لكل روبوت يعمل كنقطة دخول إلى Web3. يلف الخدمات لإرسال سجلات البيانات واستقبال الإطلاقات عبر Robonomics ويسمح بتنزيل/رفع الملفات إلى IPFS. يتم تكوين هذا العقد بواسطة ملف خاص، الذي يتم وصفه أدناه. يمكن أن يكون تعلق العقد بروبوت معينمحددة عبر مساحة الاسم ROS.
* `robonomics_ros2_robot_handler` — عقدة محددة للروبوت تعتمد على فئة أساسية `basic_robonomics_handler` لتنسيق النشر والاشتراك والروبوت. يقوم بمعالجة الإطلاقات ويقرر متى يجب إرسال سجلات البيانات للتحكم في الروبوت.

## تثبيت الحزمة

للعمل مع الحزمة، تحتاج إلى البرامج التالية:

* توزيع نظام تشغيل Linux (عادةً ما يكون Ubuntu)
* توزيع ROS 2
* عقدة IPFS
* Python 3 (لتنفيذ Python للحزمة)

يرجى اتباع دليل التثبيت المتاح [هنا](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#getting-started) والتحقق من الإصدارات المطلوبة للبرنامج. بعد تنزيل المكونات المطلوبة، ستحتاج [إلى بناء](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#installation-and-building) الحزمة كحزمة ROS 2 عادية باستخدام أداة `colcon`.

## تكوين الاتصالات مع سحابة Web3

قبل بدء الحزمة، تحتاج إلى إعداد كيف سيتصل الروبوت الخاص بك بسحابة Robonomics اللامركزية وخدمات Web3 الداعمة. للقيام بذلك، تحتاج إلى تحرير ملف يسمى ملف تكوين يسمى `robonomics_pubsub_params_template.yaml`، والذي يجب أن يكون فريدًا لكل روبوت يتم تشغيله ويحتاج إلى الوصول إلى Robonomics.

يحتوي الملف على الحقول التكوينية التالية:

| الحقل                 | الوصف                                                                                                |
|-----------------------|------------------------------------------------------------------------------------------------------------|
| account_seed          | بذرة الحساب لشبكة Robonomics الفرعية                                                                      |
| crypto_type           | نوع حسابك، `ED25519` أو `SR25519`                                                                         |
| remote_node_url       | عنوان العقدة الخارجية لـ Robonomics، الافتراضي هو `wss://kusama.rpc.robonomics.network`، للعقدة المحلية `ws://127.0.0.1:9944`|
| rws_owner_address     | عنوان مالك اشتراك Robonomics لاستخدام وحدة RWS                                                       |
| ipfs_dir_path         | مسار الدليل الذي يحتوي على ملفات IPFS                                                                 |
| ipfs_gateway          | بوابة IPFS لتنزيل الملفات، على سبيل المثال `https://ipfs.io`                                           |
| pinata_api_key        | مفتاح API من [Pinata](https://www.pinata.cloud/) لخدمة تعليق الملفات على IPFS                         |
| pinata_api_secret_key | مفتاح API سري من [Pinata](https://www.pinata.cloud/) لخدمة تعليق الملفات على IPFS                    |

لإنشاء حساب على شبكة Robonomics الفرعية، يرجى استخدام [الدليل التالي](https://wiki.robonomics.network/docs/create-account-in-dapp/) على ويكيبيديا الخاصة بنا. يرجى إيلاء اهتمام خاص لنوع الحساب الذي تقوم بإنشائه، حيث أن الحسابات ذات النوع SR25519 لا يمكنها استخدام تشفير الملفات.

{% roboWikiNote {type: "warning", title: "تحذير"}%}

  عبارة البذرة هي معلومات حساسة تسمح لأي شخص باستخدم حسابك. تأكد من عدم رفع ملف تكوين معه إلى GitHub أو أي مكان آخر.

{% endroboWikiNote %}

Pay attention to the `remote_node_url` field, as it allows you to choose how exactly to connect to the Robonomics parachain, including locally. You can deploy your local Robonomics instance for testing and development. Instructions on how to do this are available in [this article](https://wiki.robonomics.network/docs/run-dev-node/) on our wiki.

If you have a Robonomics subscription that allows you to send transactions without fees, please insert the address of the subscription owner to the `rws_owner_address` field. Don't forget that your account must be added to your subscription. Instructions on how to activate your Robonomics subscription are available in two guides: via [Robonomics dapp](https://wiki.robonomics.network/docs/sub-activate/) with user-friendly interface or via [Robonomics Substrate portal](https://wiki.robonomics.network/docs/get-subscription/).

The `ipfs_gateway` parameter allows you to specify the gateway through which IPFS files will be downloaded. These can be either [public gateways](https://ipfs.github.io/public-gateway-checker/) or specialized private ones (for example, those obtained on Pinata)