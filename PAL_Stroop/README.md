# Information pushed to the database
* Deviceid- Device name set by the user during first launch
* Userid- User id set by the user during first launch
* Unique id- A unique id calculated by looking at the device information
* Fruit ninja scores- Array of 3 scores, one for each level of fruit ninja
* Stroop test scores- Array of 3 scores, one for each level of stroop test
* Order - 0 corresponds to fruit_ninja --> stroop test    and    1 corresponds to stroop_test --> fruit_ninja
* time - ISOString containing information about the games were played

# Stroop_ninja_game_app
* Contains electron + react +redux implementation of Fruit Ninja and Stroop Test
* Only a **desktop** cross platform  application
* The same source has been used for the mobile application in **Stroop_ninja_mobile_app**. This has been done by building the react part of this app into an index.html file and asssociated files. This index.html file is then used as a WebView in the mobile application.
* Before building the react app to use for mobile webview, cerain changes need to be made
  * On MainScreen.jsx all uses of electron modules must be removed and replaced. The code to be used as replacement has been mentioned in comments
  * In src/components/Games/fruit_ninja/ since the display size of the Fruit Ninja game needs to be modified for using on a mobile, the required code has been mentioned in comments.
  * Basically, all changes that need to be made are mentioned in comments.


# Stroop_ninja_mobile_app
* Contains a react native project
* The only component returned by React Native is a WebView which looks for an index.html 
* This index.html is the result of a build command on Stroop_ninja_game_app 
* Since some communication is required between the WebView and ReactNative code, this is achieved by injecting JavaScript code into the webview. For example the machine_id is passed in this manner

# Possible areas of concern
* The Fruit Ninja game uses fixed absolute numbers for the size of on screen-elements. This can be a problem due to screen size variation of some mobile phones. To fix this, the JavaScript code in all1 and all2 were modified and a 'ratio' variable was introduced that changes the size of certain elements based on the screen size. As of (12/3/2021) this modification seems to work on and has been tested on Android phone OnePlus 7. However, this workaround has not been tested on other devices yet. To get  back the fruit_ninja code without the ratio variable all3.js and all4.js files have been left in the project. All3 corresponds to All1 and All4 corresponds to All2.
* The User Interface is very simple as of now
