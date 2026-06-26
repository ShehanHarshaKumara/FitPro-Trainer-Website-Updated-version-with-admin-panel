@extends('admin.layout')

@section('content')
<style>
  body{min-height:100vh;background:#0b090a}.login-page{position:relative;isolation:isolate;min-height:100vh;display:grid;place-items:center;overflow:hidden;padding:24px}.login-page:before,.login-page:after{content:"";position:absolute;z-index:-1;border-radius:999px;filter:blur(2px)}.login-page:before{width:560px;height:560px;top:-280px;left:-160px;background:radial-gradient(circle,#ef44448a,transparent 68%)}.login-page:after{width:510px;height:510px;right:-190px;bottom:-230px;background:radial-gradient(circle,#9f12398a,transparent 68%)}.signin-shell{display:grid;grid-template-columns:1fr 1fr;width:min(960px,100%);min-height:590px;overflow:hidden;border:1px solid #ffffff1f;border-radius:24px;background:#151012cc;box-shadow:0 30px 100px #000a;backdrop-filter:blur(18px)}.signin-story{position:relative;overflow:hidden;padding:52px;background:linear-gradient(145deg,#b91c1c,#7f1d1d 56%,#3f1014);display:flex;flex-direction:column;justify-content:space-between}.signin-story:after{content:"";position:absolute;width:360px;height:360px;right:-155px;bottom:-190px;border-radius:50%;border:52px solid #ffffff1a}.brand-mark{display:inline-flex;align-items:center;gap:10px;font-weight:900;font-size:24px;letter-spacing:-.04em}.brand-square{display:grid;place-items:center;width:36px;height:36px;border:1px solid #ffffff44;border-radius:10px;background:#ffffff1a;color:#fff}.story-copy{position:relative;z-index:1}.story-copy h1{font-size:43px;line-height:1.02;letter-spacing:-.055em;margin:0 0 18px}.story-copy p{max-width:330px;margin:0;color:#ffe4e6;line-height:1.65}.story-badge{display:inline-flex;align-items:center;gap:8px;padding:9px 12px;border:1px solid #ffffff2b;border-radius:999px;background:#0002;color:#fff;font-size:12px;font-weight:700;letter-spacing:.05em;text-transform:uppercase}.signin-form{padding:52px;display:flex;flex-direction:column;justify-content:center}.signin-form h2{margin:0;font-size:30px;letter-spacing:-.04em}.signin-form .intro{margin:10px 0 28px;color:#9ca3af;line-height:1.6}.field{position:relative;margin-bottom:17px}.field label{display:block;margin-bottom:8px;color:#d1d5db;font-size:12px;font-weight:700;letter-spacing:.03em}.field input[type=email],.field input[type=password],.field input[type=text]{margin:0;padding:13px 14px;background:#0d0b0c;border-color:#34262a;transition:.2s}.field input:focus{border-color:#ef4444;box-shadow:0 0 0 4px #ef44441a}.password-toggle{position:absolute;right:10px;bottom:9px;border:0;background:transparent;color:#f87171;padding:5px;cursor:pointer;font-size:12px}.remember-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:3px 0 23px;color:#a7afb9;font-size:13px}.remember-row label{display:flex;align-items:center;gap:8px;cursor:pointer}.remember-row input{accent-color:#ef4444}.signin-button{width:100%;padding:14px;border-radius:10px;background:linear-gradient(110deg,#ef4444,#dc2626);font-weight:800;box-shadow:0 12px 28px #dc26263d;transition:.2s}.signin-button:hover{transform:translateY(-1px);filter:brightness(1.08)}.error-box{margin:-8px 0 18px;border:1px solid #f8717166;border-radius:10px;background:#7f1d1d44;color:#fecaca;padding:11px 13px;font-size:13px}@media(max-width:760px){.login-page{padding:14px}.signin-shell{grid-template-columns:1fr;min-height:0}.signin-story{min-height:240px;padding:30px}.story-copy h1{font-size:32px}.signin-form{padding:32px 26px}.story-badge{align-self:flex-start}}@media(max-width:400px){.signin-form{padding:28px 20px}.signin-story{padding:25px}.story-copy p{font-size:14px}}
</style>
<style>
  .website-button{display:block;margin-top:12px;width:100%;padding:13px;border:1px solid #ffffff26;border-radius:10px;background:#ffffff0d;color:#fff;text-align:center;font-size:14px;font-weight:800;transition:.2s}.website-button:hover{border-color:#f87171;background:#ffffff18;transform:translateY(-1px)}
</style>

<main class="login-page">
  <section class="signin-shell">
    <aside class="signin-story">
      <div class="brand-mark"><span class="brand-square">M</span> MANULA D</div>
      <div class="story-copy"><h1>Build the next<br>stronger version.</h1><p>Manage your coaching content, client enquiries, gallery, and website performance from one focused workspace.</p></div>
      <span class="story-badge">● Secure admin access</span>
    </aside>
    <div class="signin-form">
      <h2>Welcome back</h2>
      <p class="intro">Sign in to the Manula D administration panel.</p>
      @if ($errors->any())<div class="error-box">{{ $errors->first() }}</div>@endif
      <form method="POST" action="{{ route('admin.authenticate') }}">@csrf
        <div class="field"><label for="email">EMAIL ADDRESS</label><input id="email" name="email" type="email" value="{{ old('email') }}" placeholder="you@example.com" required autofocus></div>
        <div class="field"><label for="password">PASSWORD</label><input id="password" name="password" type="password" placeholder="Enter your password" required><button class="password-toggle" type="button" onclick="const field=document.getElementById('password');field.type=field.type==='password'?'text':'password';this.textContent=field.type==='password'?'SHOW':'HIDE'">SHOW</button></div>
        <div class="remember-row"><label><input type="checkbox" name="remember"> Keep me signed in</label><span>Admin only</span></div>
        <button class="signin-button" type="submit">Sign in to dashboard →</button>
      </form>
      <a class="website-button" href="{{ config('app.website_url') }}" target="_blank" rel="noopener noreferrer">Open FitPro Training Website ↗</a>
    </div>
  </section>
</main>
@endsection
