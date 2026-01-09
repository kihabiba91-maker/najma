
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import ImageDisplay from './components/ImageDisplay';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import CredentialsScreen from './components/CredentialsScreen';
import CookieConsentBanner from './components/CookieConsentBanner';
import MyWorksGallery from './components/MyWorksGallery';
import ImageEditor from './components/ImageEditor';
import Sidebar from './components/Sidebar';
import SocialLoginModal from './components/SocialLoginModal';
import MainMenu from './components/MainMenu';
import FeatureTransition from './components/FeatureTransition';
import ObjectRemover from './components/ObjectRemover';
import ImageEnhancer from './components/ImageEnhancer';
import BackButton from './components/BackButton';
import TextToSpeech from './components/TextToSpeech';
import { ImageStyle, AspectRatio, SavedImage, NumberOfImages, ImageFormat, AppView } from './types';
import { generateImage, editImage } from './services/geminiService';
import { getLoggedInUser, loginUser, logoutUser, saveImage, getImages, verifyCredentials } from './services/storageService';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<string | null>(() => getLoggedInUser());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!getLoggedInUser());
  const [authError, setAuthError] = useState<string | null>(null);
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [loginStep, setLoginStep] = useState<'options' | 'credentials'>('options');
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [socialLoginProvider, setSocialLoginProvider] = useState<'google' | 'apple' | 'microsoft' | null>(null);

  const [currentView, setCurrentView] = useState<AppView>('menu');
  const [transitionInfo, setTransitionInfo] = useState<{ element: HTMLElement, targetView: AppView } | null>(null);

  const [prompt, setPrompt] = useState<string>('');
  const [negativePrompt, setNegativePrompt] = useState<string>('');
  const [imageStyle, setImageStyle] = useState<ImageStyle>(ImageStyle.CARTOON);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
  const [numberOfImages, setNumberOfImages] = useState<NumberOfImages>(NumberOfImages.FOUR);
  const [imageFormat, setImageFormat] = useState<ImageFormat>(ImageFormat.JPG);
  
  const [uploadedImage, setUploadedImage] = useState<{ file: File; dataUrl: string; width: number; height: number; } | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [myWorks, setMyWorks] = useState<SavedImage[]>([]);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [editingImage, setEditingImage] = useState<string | null>(null);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 3000);
    const consent = localStorage.getItem('najma-cookie-consent');
    if (consent) setHasConsented(true);
    if (currentUser) getImages(currentUser).then(setMyWorks).catch(console.error);
    return () => clearTimeout(splashTimer);
  }, [currentUser]);

  const handleSocialLogin = (provider: 'google' | 'apple' | 'microsoft') => setSocialLoginProvider(provider);

  const handleSelectSocialAccount = async (email: string) => {
    loginUser(email, true);
    setCurrentUser(email);
    setIsLoggedIn(true);
    setAuthError(null);
    const images = await getImages(email);
    setMyWorks(images);
    setSocialLoginProvider(null);
    setCurrentView('menu');
  };

  const handleCredentialsLogin = async (email: string, password: string, rememberMe: boolean) => {
    const lowerCaseEmail = email.toLowerCase().trim();
    if (verifyCredentials(lowerCaseEmail, password)) {
        loginUser(lowerCaseEmail, rememberMe);
        setCurrentUser(lowerCaseEmail);
        setIsLoggedIn(true);
        setAuthError(null);
        const images = await getImages(lowerCaseEmail);
        setMyWorks(images);
        setCurrentView('menu');
    } else {
        setAuthError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setMyWorks([]);
    setCurrentView('menu');
  };

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim() && !uploadedImage) {
      setError('الرجاء إدخال وصف للصورة أو رفع صورة للتعديل');
      return;
    }
    if (!currentUser) return;
    setIsLoading(true);
    setError(null);
    setGeneratedImages(null);
    try {
      let imageUrls: string[];
      if (uploadedImage) {
        const base64Data = uploadedImage.dataUrl.split(',')[1];
        imageUrls = await editImage(prompt, negativePrompt, imageStyle, base64Data, uploadedImage.file.type, aspectRatio, numberOfImages);
      } else {
        imageUrls = await generateImage(prompt, negativePrompt, imageStyle, aspectRatio, numberOfImages, imageFormat);
      }
      setGeneratedImages(imageUrls);
      for (const url of imageUrls) {
          const newImage: Omit<SavedImage, 'id' | 'createdAt' | 'userEmail'> = { 
            imageUrl: url, prompt: prompt || 'تعديل صورة', negativePrompt, style: imageStyle, aspectRatio 
          };
          await saveImage(currentUser, newImage);
      }
      const updatedImages = await getImages(currentUser);
      setMyWorks(updatedImages);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'حدث خطأ في النظام.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, negativePrompt, imageStyle, aspectRatio, numberOfImages, imageFormat, uploadedImage, currentUser]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setUploadedImage({ file, dataUrl: event.target?.result as string, width: img.width, height: img.height });
          setImageStyle(ImageStyle.NONE);
          setAspectRatio(AspectRatio.NONE);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'generator':
        return (
          <div className="flex-1 flex flex-col lg:flex-row gap-8 animate-fade-in">
             <div className="lg:hidden mb-4"><BackButton onBack={() => setCurrentView('menu')} /></div>
             <Sidebar 
                prompt={prompt} setPrompt={setPrompt} negativePrompt={negativePrompt} setNegativePrompt={setNegativePrompt}
                imageStyle={imageStyle} setImageStyle={setImageStyle} aspectRatio={aspectRatio} setAspectRatio={setAspectRatio}
                numberOfImages={numberOfImages} setNumberOfImages={setNumberOfImages} imageFormat={imageFormat} setImageFormat={setImageFormat}
                uploadedImage={uploadedImage} handleImageUpload={handleImageUpload} handleRemoveImage={() => setUploadedImage(null)}
                handleGenerateImage={handleGenerateImage} isLoading={isLoading}
             />
             <div className="flex-1 flex flex-col gap-6">
                <div className="hidden lg:block"><BackButton onBack={() => setCurrentView('menu')} /></div>
                <ImageDisplay imageUrls={generatedImages} isLoading={isLoading} error={error} onDownload={(u) => window.open(u)} onEdit={setEditingImage} onGenerateVariations={() => {}} />
             </div>
          </div>
        );
      case 'object_remover': return <ObjectRemover onBack={() => setCurrentView('menu')} />;
      case 'enhancer': return <ImageEnhancer onBack={() => setCurrentView('menu')} />;
      case 'text_to_speech': return <TextToSpeech onBack={() => setCurrentView('menu')} />;
      default:
        return <MainMenu onSelectView={(view, e) => {
            if (e && e.currentTarget.querySelector('svg')) {
                setTransitionInfo({ element: e.currentTarget.querySelector('svg') as unknown as HTMLElement, targetView: view });
            } else setCurrentView(view);
        }} />;
    }
  };

  if (showSplash) return <SplashScreen />;
  if (!isLoggedIn) {
      if (loginStep === 'credentials') return <CredentialsScreen email={loginEmail} onLogin={handleCredentialsLogin} onBack={() => setLoginStep('options')} error={authError} clearError={() => setAuthError(null)} />;
      return (
        <>
            <LoginScreen onNavigateToCredentials={(e) => { setLoginEmail(e); setLoginStep('credentials'); }} onSocialLogin={handleSocialLogin} error={authError} clearError={() => setAuthError(null)} />
            {socialLoginProvider && <SocialLoginModal provider={socialLoginProvider} onClose={() => setSocialLoginProvider(null)} onSelectAccount={handleSelectSocialAccount} />}
        </>
      );
  }

  return (
    <div className="min-h-screen flex flex-col px-4 sm:px-8 max-w-screen-2xl mx-auto relative">
      <AnimatedBackground />
      <Header onLogout={handleLogout} onShowGallery={() => setShowGallery(true)} onNavigateHome={() => setCurrentView('menu')} />
      {transitionInfo && (
          <FeatureTransition starElement={transitionInfo.element} onTransitionEnd={() => { setCurrentView(transitionInfo.targetView); setTransitionInfo(null); }} />
      )}
      {renderCurrentView()}
      <Footer />
      <CookieConsentBanner onConsent={() => setHasConsented(true)} />
      {showGallery && <MyWorksGallery images={myWorks} onClose={() => setShowGallery(false)} onDownload={(u) => window.open(u)} onReEdit={(img) => { setPrompt(img.prompt); setImageStyle(img.style); setAspectRatio(img.aspectRatio); setCurrentView('generator'); setShowGallery(false); }} />}
      {editingImage && <ImageEditor imageUrl={editingImage} onClose={() => setEditingImage(null)} onDownload={(u) => window.open(u)} onSave={(u) => { setGeneratedImages(prev => prev ? prev.map(img => img === editingImage ? u : img) : [u]); setEditingImage(null); }} />}
    </div>
  );
};

export default App;
