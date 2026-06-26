@extends('admin.layout')

@section('content')
<style>
  .hero{position:relative;overflow:hidden;padding:32px;border-radius:18px;background:linear-gradient(120deg,#201419,#111a25 60%,#151d30);border:1px solid #3b3440}.hero:after{content:"";position:absolute;width:280px;height:280px;border-radius:50%;right:-100px;top:-120px;background:#ef4444;filter:blur(70px);opacity:.35}.eyebrow{color:#ff7777;text-transform:uppercase;letter-spacing:.14em;font-size:11px;font-weight:800}.metric{position:relative;overflow:hidden}.metric:before{content:"";position:absolute;inset:0 auto 0 0;width:3px;background:#ef4444}.metric .count{font-size:30px}.metric small{color:#8190a4}.analytics{display:grid;grid-template-columns:1.15fr .85fr;gap:18px;margin-top:18px}.list-row{display:flex;align-items:center;justify-content:space-between;padding:13px 0;border-bottom:1px solid #27303b}.list-row:last-child{border:0}.bar{height:7px;border-radius:20px;background:#252d37;overflow:hidden;margin-top:7px}.bar span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#ef4444,#fb923c)}.page-path{font-family:ui-monospace,monospace;font-size:13px;color:#cbd5e1}.chart{height:210px;display:flex;align-items:flex-end;gap:12px;padding:18px 4px 0;border-bottom:1px solid #303946}.chart-col{height:100%;flex:1;display:flex;min-width:25px;flex-direction:column;justify-content:flex-end;align-items:center;gap:8px}.chart-bar{width:100%;max-width:46px;min-height:4px;border-radius:8px 8px 2px 2px;background:linear-gradient(#fb923c,#ef4444);box-shadow:0 6px 18px #ef444433}.chart-label,.chart-value{font-size:11px;color:#8d9aad}.chart-value{color:#e7edf5;font-weight:700}@media(max-width:900px){.analytics{grid-template-columns:1fr}.hero{padding:24px}}
</style>

<div class="hero">
  <div style="position:relative;z-index:1"><div class="eyebrow">Manula D control centre</div><h1 style="font-size:32px;margin:8px 0">Welcome back, {{ auth()->user()->name }}</h1><p style="color:#b3becd;max-width:620px;margin:0">See your website activity, keep content fresh, and stay on top of new coaching enquiries.</p><div style="display:flex;gap:10px;margin-top:22px;flex-wrap:wrap"><a class="btn" href="{{ route('admin.resources', 'services') }}">Manage website content</a><a class="btn dark" href="{{ route('admin.feedback') }}">Open feedback inbox</a><a class="btn dark" href="http://localhost:5173" target="_blank" rel="noopener">View website</a><button class="btn dark" type="button" onclick="document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()">Full screen</button></div></div>
</div>

<div class="grid" style="margin-top:18px">
  <div class="card metric"><small>Visits today</small><div class="count">{{ number_format($visits['today']) }}</div><small>Page views since midnight</small></div>
  <div class="card metric"><small>Total page views</small><div class="count">{{ number_format($visits['total']) }}</div><small>All recorded website activity</small></div>
  <div class="card metric"><small>Unique visitors</small><div class="count">{{ number_format($visits['unique']) }}</div><small>Browser-based estimate</small></div>
  <div class="card metric"><small>New enquiries</small><div class="count">{{ number_format($counts['feedback']) }}</div><small>Waiting for your reply</small></div>
</div>

<section class="card" style="margin-top:18px">
  <div class="top" style="margin-bottom:0"><div><h2 style="margin:0">Visits over the last 7 days</h2><p style="color:#8d9aad;margin:5px 0 0">Daily page-view trend</p></div><span class="status">Live analytics</span></div>
  @php($peak = max(1, $visits['series']->max('visits')))
  <div class="chart">
    @foreach ($visits['series'] as $day)
      <div class="chart-col"><span class="chart-value">{{ $day['visits'] }}</span><div class="chart-bar" style="height:{{ max(4, ($day['visits'] / $peak) * 160) }}px"></div><span class="chart-label">{{ $day['label'] }}</span></div>
    @endforeach
  </div>
</section>

<div class="analytics">
  <section class="card"><div class="top" style="margin-bottom:5px"><div><h2 style="margin:0">Top pages</h2><p style="color:#8d9aad;margin:5px 0 0">Most-viewed website routes</p></div></div>
    @if ($visits['pages']->isEmpty())
      <p style="color:#8d9aad">Visit data will appear here as people browse your website.</p>
    @else
      @php($largest = max(1, $visits['pages']->first()->visits))
      @foreach ($visits['pages'] as $page)
        <div class="list-row"><div style="flex:1;padding-right:18px"><span class="page-path">{{ $page->path }}</span><div class="bar"><span style="width:{{ ($page->visits / $largest) * 100 }}%"></span></div></div><strong>{{ number_format($page->visits) }}</strong></div>
      @endforeach
    @endif
  </section>
  <section class="card"><h2 style="margin-top:0">Recent activity</h2><p style="color:#8d9aad;margin-top:-7px">Latest website page views</p>
    @if ($visits['recent']->isEmpty())
      <p style="color:#8d9aad">No visits recorded yet.</p>
    @else
      @foreach ($visits['recent'] as $visit)
        <div class="list-row"><div><div class="page-path">{{ $visit->path }}</div><small>{{ $visit->created_at->diffForHumans() }}</small></div><span class="status">visit</span></div>
      @endforeach
    @endif
  </section>
</div>

<div class="grid" style="margin-top:18px">
  <a class="card" href="{{ route('admin.resources', 'services') }}"><small>Published content</small><div class="count">{{ $counts['services'] }}</div><strong>Services</strong></a>
  <a class="card" href="{{ route('admin.resources', 'packages') }}"><small>Published content</small><div class="count">{{ $counts['packages'] }}</div><strong>Packages</strong></a>
  <a class="card" href="{{ route('admin.resources', 'gallery') }}"><small>Media library</small><div class="count">{{ $counts['gallery'] }}</div><strong>Gallery images</strong></a>
  <a class="card" href="{{ route('admin.feedback') }}"><small>Messages to review</small><div class="count">{{ $counts['feedback'] }}</div><strong>Feedback inbox</strong></a>
</div>
@endsection
