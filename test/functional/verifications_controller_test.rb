require 'test_helper'

class VerificationsControllerTest < ActionController::TestCase
  setup do
    @verification = verifications(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:verifications)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create verification" do
    assert_difference('Verification.count') do
      post :create, verification: @verification.attributes
    end

    assert_redirected_to verification_path(assigns(:verification))
  end

  test "should show verification" do
    get :show, id: @verification
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @verification
    assert_response :success
  end

  test "should update verification" do
    put :update, id: @verification, verification: @verification.attributes
    assert_redirected_to verification_path(assigns(:verification))
  end

  test "should destroy verification" do
    assert_difference('Verification.count', -1) do
      delete :destroy, id: @verification
    end

    assert_redirected_to verifications_path
  end
end
