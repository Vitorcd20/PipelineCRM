export function DealCardSkeleton() {
  return (
    <div className="skel-card">
      <div style={{display:'flex',justifyContent:'space-between',gap:8}}>
        <div style={{flex:1,display:'flex',flexDirection:'column',gap:6}}>
          <div className="skel" style={{height:14,width:'80%'}}/>
          <div className="skel" style={{height:11,width:'50%'}}/>
        </div>
      </div>
      <div className="skel" style={{height:11,width:'90%'}}/>
      <div style={{borderTop:'1px solid var(--bd)',paddingTop:8,display:'flex',justifyContent:'space-between'}}>
        <div className="skel" style={{height:16,width:70}}/>
        <div className="skel" style={{height:11,width:60}}/>
      </div>
    </div>
  )
}

export function SidebarSkeleton() {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      <div style={{background:'var(--c-s3)',border:'1px solid var(--c-bd2)',borderRadius:16,padding:'1.1rem',display:'flex',flexDirection:'column',gap:8}}>
        <div className="skel" style={{height:9,width:80}}/>
        <div className="skel" style={{height:36,width:130,borderRadius:6}}/>
        <div className="skel" style={{height:11,width:90}}/>
      </div>
      {[...Array(4)].map((_,i)=>(
        <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 10px'}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div className="skel" style={{width:8,height:8,borderRadius:'50%'}}/>
            <div className="skel" style={{height:11,width:70}}/>
          </div>
          <div className="skel" style={{height:11,width:50}}/>
        </div>
      ))}
    </div>
  )
}
