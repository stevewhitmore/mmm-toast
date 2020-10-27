# mmm-toast [![npm version](https://badge.fury.io/js/mmm-toast.svg)](https://badge.fury.io/js/mmm-toast) [![npm monthly downloads](https://img.shields.io/npm/dm/mmm-toast.svg?style=flat-square)](https://www.npmjs.com/package/mmm-toast)
An angularX toast component that shows growl-style alerts and messages for your application.
This is a continuation of the legacy previously championed by [ngx-toasta](https://github.com/emonney/ngx-toasta)
and before that [ng2-toasty](https://github.com/akserg/ng2-toasty) with the latest package versions and additional enhancements.


## Installation
```sh
npm install mmm-toast
```

## Demo

Online demo available [here](https://stevewhitmore.github.io/mmm-toast)

## Usage
If you use SystemJS to load your files, you might have to update your config:

```js
System.config({
    map: {
        'mmm-toast': 'node_modules/mmm-toast/bundles/index.umd.js'
    }
});
```

#### 1. Update the markup
- Import style into your web page. Choose one of the following files;
  - `style-default.css` - Contains DEFAULT theme
  - `style-bootstrap.css` - Contains Bootstrap 3 theme
  - `style-material.css` - Contains Material Design theme
- Assign the selected theme name [`default`, `bootstrap`, `material`] to the `theme` property of the instance of ToastyConfig.
- Add `<mmm-toast></mmm-toast>` tag in template of your application component.

#### 2. Import the `ToastyModule`
Import `ToastyModule.forRoot()` in the NgModule of your application. 
The `forRoot` method is a convention for modules that provide a singleton service.

```ts
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';
import {ToastyModule} from 'mmm-toast';

@NgModule({
    imports: [
        BrowserModule,
        ToastyModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

If you have multiple NgModules and you use one as a shared NgModule (that you import in all of your other NgModules), 
don't forget that you can use it to export the `ToastyModule` that you imported in order to avoid having to import it multiple times.

```ts
@NgModule({
    imports: [
        BrowserModule,
        ToastyModule.forRoot()
    ],
    exports: [BrowserModule, ToastyModule],
})
export class SharedModule {
}
```

#### 3. Use the `ToastyService` for your application
- Import `ToastyService` from `mmm-toast` in your application code:

```js
import {Component} from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'mmm-toast';

@Component({
    selector: 'app',
    template: `
        <div>Hello world</div>
        <button (click)="addToast()">Add Toast</button>
        <mmm-toast></mmm-toast>
    `
})
export class AppComponent {
    
    constructor(private ToastyService:ToastyService, private ToastyConfig: ToastyConfig) { 
        // Assign the selected theme name to the `theme` property of the instance of ToastyConfig. 
        // Possible values: default, bootstrap, material
        this.ToastyConfig.theme = 'material';
    }
    
    addToast() {
        // Just add default Toast with title only
        this.ToastyService.default('Hi there');
        // Or create the instance of ToastOptions
        var toastOptions:ToastOptions = {
            title: "My title",
            msg: "The message",
            showClose: true,
            timeout: 5000,
            theme: 'default',
            onAdd: (toast:ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        // Add see all possible types in one shot
        this.ToastyService.info(toastOptions);
        this.ToastyService.success(toastOptions);
        this.ToastyService.wait(toastOptions);
        this.ToastyService.error(toastOptions);
        this.ToastyService.warning(toastOptions);
    }
}
```

#### 4. How to dynamically update title and message of a toast
Here is an example of how to dynamically update message and title of individual toast:

```js
import {Component} from '@angular/core';
import {ToastyService, ToastyConfig, ToastyComponent, ToastOptions, ToastData} from 'mmm-toast';
import {Subject, Observable, Subscription} from 'rxjs/Rx';

@Component({
    selector: 'app',
    template: `
        <div>Hello world</div>
        <button (click)="addToast()">Add Toast</button>
        <mmm-toast></mmm-toast>
    `
})
export class AppComponent {
    
    getTitle(num: number): string {
        return 'Countdown: ' + num;
    }

    getMessage(num: number): string {
        return 'Seconds left: ' + num;
    }
    
    constructor(private ToastyService:ToastyService) { }
    
    addToast() {
        let interval = 1000;
        let timeout = 5000;
        let seconds = timeout / 1000;
        let subscription: Subscription;
        
        let toastOptions: ToastOptions = {
            title: this.getTitle(seconds),
            msg: this.getMessage(seconds),
            showClose: true,
            timeout: timeout,
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
                // Run the timer with 1 second iterval
                let observable = Observable.interval(interval).take(seconds);
                // Start listen seconds beat
                subscription = observable.subscribe((count: number) => {
                    // Update title of toast
                    toast.title = this.getTitle(seconds - count - 1);
                    // Update message of toast
                    toast.msg = this.getMessage(seconds - count - 1);
                });

            },
            onRemove: function(toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
                // Stop listenning
                subscription.unsubscribe();
            }
        };

        switch (this.options.type) {
            case 'default': this.ToastyService.default(toastOptions); break;
            case 'info': this.ToastyService.info(toastOptions); break;
            case 'success': this.ToastyService.success(toastOptions); break;
            case 'wait': this.ToastyService.wait(toastOptions); break;
            case 'error': this.ToastyService.error(toastOptions); break;
            case 'warning': this.ToastyService.warning(toastOptions); break;
        }
    }
}
```

#### 5. How to close specific toast
Here is an example of how to close an individual toast:

```js
import {Component} from '@angular/core';
import {ToastyService, ToastyConfig, ToastyComponent, ToastOptions, ToastData} from 'mmm-toast';
import {Subject, Observable, Subscription} from 'rxjs/Rx';

@Component({
    selector: 'app',
    template: `
        <div>Hello world</div>
        <button (click)="addToast()">Add Toast</button>
        <mmm-toast></mmm-toast>
    `
})
export class AppComponent {
    
    getTitle(num: number): string {
        return 'Countdown: ' + num;
    }

    getMessage(num: number): string {
        return 'Seconds left: ' + num;
    }
    
    constructor(private ToastyService:ToastyService) { }
    
    addToast() {
        let interval = 1000;
        let subscription: Subscription;
        
        let toastOptions: ToastOptions = {
            title: this.getTitle(0),
            msg: this.getMessage(0),
            showClose: true,
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
                // Run the timer with 1 second iterval
                let observable = Observable.interval(interval);
                // Start listen seconds beat
                subscription = observable.subscribe((count: number) => {
                    // Update title of toast
                    toast.title = this.getTitle(count);
                    // Update message of toast
                    toast.msg = this.getMessage(count);
                    // Extra condition to hide Toast after 10 sec
                    if (count > 10) {
                        // We use toast id to identify and hide it
                        this.ToastyService.clear(toast.id);
                    }
                });

            },
            onRemove: function(toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
                // Stop listenning
                subscription.unsubscribe();
            }
        };

        switch (this.options.type) {
            case 'default': this.ToastyService.default(toastOptions); break;
            case 'info': this.ToastyService.info(toastOptions); break;
            case 'success': this.ToastyService.success(toastOptions); break;
            case 'wait': this.ToastyService.wait(toastOptions); break;
            case 'error': this.ToastyService.error(toastOptions); break;
            case 'warning': this.ToastyService.warning(toastOptions); break;
        }
    }
}
```

#### 6. Customize the `mmm-toast` for your application in template
You can use the following properties to customize the mmm-toast component in your template:

- `position` - The window position where the toast pops up. Default value is `bottom-right`. Possible values: `bottom-right`, `bottom-left`, `bottom-fullwidth` `top-right`, `top-left`, `top-fullwidth`,`top-center`, `bottom-center`, `center-center`
Example:

```html
<mmm-toast [position]="'top-center'"></mmm-toast>
```


#### 7. Options
Use these options to configure individual or global toasts


Options specific to an individual toast:

```js
ToastOptions
{
    "title": string,      //A string or html for the title
    "msg": string,        //A string or html for the message
    "showClose": true,    //Whether to show a close button
    "showDuration": true, //Whether to show a progress bar
    "theme": "default",   //The theme to apply to this toast
    "timeout": 5000,      //Time to live until toast is removed. 0 is unlimited
    "onAdd": Function,    //Function that gets called after this toast is added
    "onRemove": Function  //Function that gets called after this toast is removed
}
```



Configurations that affects all toasts:

```js
ToastyConfig
{
    "limit": 5,                 //Maximum toasts that can be shown at once. Older toasts will be removed. 0 is unlimited
    "showClose": true,          //Whether to show the 'x' icon to close the toast
    "showDuration": true,       //Whether to show a progress bar at the bottom of the notification
    "position": "bottom-right", //The window position where the toast pops up
    "timeout": 5000,            //Time to live in milliseconds. 0 is unlimited
    "theme": "default"          //What theme to use
}
```


# Credits 
Original work by [ng2-toasty](https://github.com/akserg/ng2-toasty)


# License
 [MIT](https://github.com/stevewhitmore/mmm-toast/blob/master/LICENSE)
