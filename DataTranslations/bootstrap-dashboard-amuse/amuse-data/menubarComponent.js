

var Generate_Menu = function() {

    
    
    var allItemsInHtml = "
    
    <nav class='navbar navbar-expand-lg navbar-dark bg-dark fixed-top' id='mainNav'>
    <a class='navbar-brand' href='index.html'>Amuse - Patients</a>
    <button class='navbar-toggler navbar-toggler-right' type='button' data-toggle='collapse' data-target='#navbarResponsive' aria-controls='navbarResponsive' aria-expanded='false' aria-label='Toggle navigation'>
      <span class='navbar-toggler-icon'></span>
    </button>
    <div class='collapse navbar-collapse' id='navbarResponsive'>
      <ul class='navbar-nav navbar-sidenav' id='exampleAccordion'>
        <li class='nav-item' data-toggle='tooltip' data-placement='right' title='Dashboard'>
          <a class='nav-link' href='index.html'>
            <i class='fa fa-fw fa-dashboard'></i>
            <span class='nav-link-text'>Dashboard</span>
          </a>
        </li>
        
      </ul>
      <ul class='navbar-nav sidenav-toggler'>
        <li class='nav-item'>
          <a class='nav-link text-center' id='sidenavToggler'>
            <i class='fa fa-fw fa-angle-left'></i>
          </a>
        </li>
      </ul>
      <ul class='navbar-nav ml-auto'>
        
          <li class='nav-item'>
          <form class='form-inline my-2 my-lg-0 mr-lg-2'>
            <div class='input-group'>
              <input class='form-control' type='text' placeholder='Search for...'>
              <span class='input-group-append'>
                <button class='btn btn-primary' type='button'>
                  <i class='fa fa-search'></i>
                </button>
              </span>
            </div>
          </form>
        </li>
          
        <li class='nav-item dropdown'>
          <a class='nav-link dropdown-toggle mr-lg-2' id='alertsDropdown' href='#' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            <i class='fa fa-fw fa-bell'></i>
            <span class='d-lg-none'>Alerts
              <span class='badge badge-pill badge-warning'>6 New</span>
            </span>
            <span class='indicator text-warning d-none d-lg-block'>
              <i class='fa fa-fw fa-circle'></i>
            </span>
          </a>
          <div class='dropdown-menu' aria-labelledby='alertsDropdown'>
            <h6 class='dropdown-header'>New Alerts:</h6>
            <div class='dropdown-divider'></div>
            <a class='dropdown-item' href='#'>
              <span class='text-success'>
                <strong>
                  <i class='fa fa-long-arrow-up fa-fw'></i>Status Update</strong>
              </span>
              <span class='small float-right text-muted'>11:21 AM</span>
              <div class='dropdown-message small'>This is an automated server response message. All systems are online.</div>
            </a>
            <div class='dropdown-divider'></div>
            <a class='dropdown-item' href='#'>
              <span class='text-danger'>
                <strong>
                  <i class='fa fa-long-arrow-down fa-fw'></i>Status Update</strong>
              </span>
              <span class='small float-right text-muted'>11:21 AM</span>
              <div class='dropdown-message small'>This is an automated server response message. All systems are online.</div>
            </a>
            <div class='dropdown-divider'></div>
            <a class='dropdown-item' href='#'>
              <span class='text-success'>
                <strong>
                  <i class='fa fa-long-arrow-up fa-fw'></i>Status Update</strong>
              </span>
              <span class='small float-right text-muted'>11:21 AM</span>
              <div class='dropdown-message small'>This is an automated server response message. All systems are online.</div>
            </a>
            <div class='dropdown-divider'></div>
            <a class='dropdown-item small' href='#'>View all alerts</a>
          </div>
        </li>
        
          <li class='nav-item'>
              <img class='d-flex mr-3 rounded-circle' src='http://placehold.it/30x30' alt=''>
              
          </li>
          <li class='nav-item'>
              <p style='color: aliceblue'>Mickey Moore</p>
              
          </li>
        
      </ul>
    </div>
  </nav>
    
    
    ";

    
    
    
    
  
   
}


var resultHtml = Generate_Menu();

document.getElementById("menu_holder").innerHTML = resultHtml;