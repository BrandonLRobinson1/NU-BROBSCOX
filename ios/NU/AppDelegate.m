/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@import GoogleMaps;
@import GooglePlaces;
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // [GMSPlacesClient provideAPIKey:@"AIzaSyCYkhqyywY6NlqnHOV91Bj0vqIjwhPtF1Y"];
  // [GMSServices provideAPIKey:@"AIzaSyCYkhqyywY6NlqnHOV91Bj0vqIjwhPtF1Y"];
  [GMSPlacesClient provideAPIKey:@"AIzaSyC8RfgskLZnQBb5xF905zW9XbUUFk8DFgs"];
  [GMSServices provideAPIKey:@"AIzaSyC8RfgskLZnQBb5xF905zW9XbUUFk8DFgs"];

  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"NU"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
