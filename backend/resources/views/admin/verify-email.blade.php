@extends('admin.layout')

@section('content')
<main class="login card" style="text-align:center">
  <div class="brand">MANULA <span style="color:white">D</span></div>
  <h1>Verify your email</h1>
  <p style="color:#aab4c3;line-height:1.6">For security, verify your administrator email before opening the dashboard. Check your inbox for the verification link.</p>
  @if (session('success'))<div class="alert">{{ session('success') }}</div>@endif
  <form method="POST" action="{{ route('verification.send') }}">@csrf<button>Send verification email again</button></form>
</main>
@endsection
