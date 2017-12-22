#import "RCTVLCPlayerManager.h"
#import "RCTVLCPlayer.h"
#import <MobileVLCKit.h>

@implementation RCTVLCPlayerManager

+ (VLCMediaPlayer*)sharedVLCPlayer {
    static VLCMediaPlayer *sharedPlayer = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        NSArray* options = @[ @"--rtsp-tcp", @"-vvv"];
        sharedPlayer = [[VLCMediaPlayer alloc] initWithOptions:options];
    });
    return sharedPlayer;
}

RCT_EXPORT_MODULE();

- (UIView *)view {
    self.playerView = [[RCTVLCPlayer alloc] initWithPlayer:[RCTVLCPlayerManager sharedVLCPlayer]];
    return self.playerView;
}


RCT_EXPORT_METHOD(releaseView) {
    [self.playerView _release];
}


RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(paused, BOOL);
RCT_EXPORT_VIEW_PROPERTY(seek, float);
RCT_EXPORT_VIEW_PROPERTY(rate, float);
RCT_EXPORT_VIEW_PROPERTY(volume, float);
RCT_EXPORT_VIEW_PROPERTY(snapshotPath, NSString);
RCT_EXPORT_VIEW_PROPERTY(onVLCPaused, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVLCStopped, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVLCBuffering, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVLCPlaying, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVLCEnded, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVLCError, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVLCProgress, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVLCVolumeChanged, RCTDirectEventBlock);

@end
